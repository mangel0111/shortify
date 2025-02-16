/**
 * Response type for the shorten URL service
 */
export type ApiResponse<T> = {
  data: T;
};

export enum UrlServiceType {
  SHORT_URL = 'short-url',
  USER = 'user',
}
