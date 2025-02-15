/**
 * Response type for the shorten URL service
 */
type ApiResponse<T> = {
  data: T;
};

export enum UrlServiceType {
  SHORT_URL = 'short-url',
}

/**
 * Response type for the shorten URL service
 */
export type ShortenUrlResponse = ApiResponse<{
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
  };
}>;
