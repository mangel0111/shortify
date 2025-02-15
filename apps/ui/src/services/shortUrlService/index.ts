import Config from '../../config';
import { CreateShortenUrlResponse } from '@src/libs';
import axios from 'axios';

const api = axios.create({
  baseURL: Config.shortUrlService,
});

/**
 * Service to shorten a long URL
 *
 * @param longUrl
 * @returns
 */
export const shortenUrl = async ({
  longUrl,
  userId,
}: {
  longUrl: string;
  userId: string;
}): Promise<string> => {
  const { data } = await api.post<CreateShortenUrlResponse>('/short-url', {
    originalUrl: longUrl,
    userId,
  });
  return data?.data?.attributes?.shortUrl;
};
