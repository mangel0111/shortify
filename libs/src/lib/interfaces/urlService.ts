import { ApiResponse, UrlServiceType } from './common';

export type ShortUrlBaseResponse = {
  /**
   * The type model of the response. e.g. 'short-url'
   */
  type: UrlServiceType.SHORT_URL;
  /**
   * The unique identifier of the URL
   */
  id: string;
  attributes: {
    /**
     * The short ID that is used to access the short URL
     */
    shortId: string;
    /**
     * The original URL that was shortened
     */
    originalUrl: string;
    /**
     * The shortened URL
     */
    shortUrl: string;
    /**
     * The date the short URL was created
     */
    createdAt: string;
    /**
     * updatedAt
     *
     */
    updatedAt: string;
    /**
     * The number of clicks the short URL has received
     */
    clicks: number;
  };
};

export type CreateShortenUrlResponse = ApiResponse<ShortUrlBaseResponse>;
export type GetShortUrlsResponse = ApiResponse<ShortUrlBaseResponse[]>;
export type GetShortUrlByIdResponse = ApiResponse<ShortUrlBaseResponse>;

export type CreateShortenUrlRequest = {
  originalUrl: string;
  userId: string;
};
