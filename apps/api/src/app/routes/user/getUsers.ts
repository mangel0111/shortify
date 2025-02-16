import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandlerMethod,
} from 'fastify';

import {
  GetUsersResponse,
} from '@src/libs';
import UserService from '../../services/userService';

export type GetUsersRoutes = {
  Reply: GetUsersResponse;
};

export const getUsers: RouteHandlerMethod<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  GetUsersRoutes
> = async () => {
  const users = await UserService.getUsers();
  return {
    data: users,
  };
};
