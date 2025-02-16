import { CreateShortenUrlResponse, GetShortUrlsResponse } from '@src/libs';

import Config from '../../config';
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
export const createShortenUrl = async ({
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

export const fetchShortUrls = async ({ userId }: { userId: string }) => {
  const { data } = await api.get<GetShortUrlsResponse>('/short-url', {
    params: {
      userId,
    },
  });
  return data.data ?? [];
};
