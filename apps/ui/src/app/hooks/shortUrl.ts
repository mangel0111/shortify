import { fetchShortUrls } from '../../services/shortUrlService';
import { useQuery } from '@tanstack/react-query';
import { useUser } from './user';

export const useGetShortUrls = () => {
  const { user } = useUser();
  const shortUrlQuery = useQuery({
    queryKey: ['short-url', user?.id],
    queryFn: async () => {
      if (!user?.id) {
        return [];
      }
      const shortUrls = await fetchShortUrls({
        userId: user?.id,
      });
      return shortUrls;
    },
    enabled: !!user?.id, // Only fetch if userId exists
  });

  return {
    shortUrls: shortUrlQuery?.data ?? [],
    isLoading: shortUrlQuery.isLoading,
  };
};
