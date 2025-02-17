/**
 * Response type for the shorten URL service
 */
export type ApiResponse<T> = {
  data: T;
  metadata?: {
    /**
     * The total number of items
     */
    total?: number;
  };
};

export enum UrlServiceType {
  SHORT_URL = 'short-url',
  USER = 'user',
}

export type ErrorResponse = {
  errors: {
    status: number;
    title: string;
    detail: string;
  }[];
};

export type PaginationParams = {
  /**
   * The number of items to return
   */
  size: number;
  /**
   * The page number to return
   */
  page: number;
};
