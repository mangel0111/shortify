import Config from '../../config';
import { CreateShortenUrlResponse } from '@src/libs';
import axios from 'axios';

const api = axios.create({
  baseURL: Config.shortUrlService,
});

/**
 * Service to shorten a long URL
 *
 *
 * @param longUrl
 * @returns
 */
export const shortenUrl = async (longUrl: string): Promise<string> => {
  const { data } = await api.post<CreateShortenUrlResponse>('/urls', {
    data: {
      type: 'short-url',
      attributes: {
        originalUrl: longUrl,
      },
    },
  });
  return data?.data?.attributes?.shortUrl;
};
