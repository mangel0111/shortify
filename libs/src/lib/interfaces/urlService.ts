/**
 * Response type for the shorten URL service
 */
type ApiResponse<T> = {
  data: T;
};

export enum UrlServiceType {
  SHORT_URL = 'short-url',
}

export type ShortUrlBaseResponse = {
  /**
   * The type model of the response. e.g. 'short-url'
   */
  type: UrlServiceType.SHORT_URL;
  /**
   * The unique identifier of the short Id
   */
  id: string;
  attributes: {
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
     * The user ID that created the short URL
     */
    userId: string;
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
