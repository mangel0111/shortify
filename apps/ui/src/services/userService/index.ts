import Config from '../../config';
import { CreateUserResponse } from '@src/libs';
import axios from 'axios';

const api = axios.create({
  baseURL: Config.shortUrlService,
});

export const createUser = async () => {
  const { data } = await api.post<CreateUserResponse>('/user', {
    name: 'John Doe', // Hardcoded name for now
  });

  return data?.data;
};

export const fetchUser = async (userId: string) => {
  try {
    const { data } = await api.get<CreateUserResponse>(`/user/${userId}`);
    return data?.data;
  } catch {
    return;
  }
};
