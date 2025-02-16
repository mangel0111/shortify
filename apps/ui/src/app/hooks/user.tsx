import { createUser, fetchUser } from '../../services/userService';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

/**
 * Hook to fetch user data
 * 
 * This hook is creating a user and storing the user id in the session storage if it doesn't exist.
 * This is done to avoid creating a proper session/account management system, that is currently out of the scope.
 * 
 * This can be extended to force a user to log in or create an account before using the app, but from now
 * we are just creating a user and storing the user id in the session storage.
 */
export const useUser = () => {
  const [userId, setUserId] = useState<string | null>(
    sessionStorage.getItem('userId')
  );

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      sessionStorage.setItem('userId', data.id);
      setUserId(data.id);
    },
  });

  // Fetch user data if an ID exists
  const userQuery = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const user = await fetchUser(userId!);
      if (!user) {
        await createUserMutation.mutate();
        return;
      }
      return user;
    },
    enabled: !!userId, // Only fetch if userId exists
  });

  useEffect(() => {
    if (!userId) {
      createUserMutation.mutate();
    }
  }, [userId, createUserMutation]);

  return {
    user: userQuery.data,
    isLoading: userQuery.isLoading || createUserMutation.isPending,
  };
};
