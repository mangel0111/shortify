import { ApiResponse, UrlServiceType } from './common';

type UserAttributesProps = {
  /**
   *
   */
  firstName: string;
  /**
   *
   */
  lastName: string;
  /**
   *
   */
  email: string;
};

/**
 * User interface
 */
export type UserBaseResponse = {
  /**
   * The type model of the response. e.g. 'short-url'
   */
  type: UrlServiceType.USER;
  /**
   * The unique identifier of the user
   */
  id: string;
  attributes: {
    /**
     * The shortened URLs associated with the user
     */
    urlsShortened: string[];
    /**
     * Created at date
     */
    createdAt: string;
    /**
     * Updated at date
     */
    updatedAt: string;
  } & UserAttributesProps;
};

export type GetUsersResponse = ApiResponse<UserBaseResponse[]>;
export type GetUserByIdResponse = ApiResponse<UserBaseResponse>;
export type CreateUserResponse = ApiResponse<UserBaseResponse>;
export type CreateUserRequest = UserAttributesProps;
