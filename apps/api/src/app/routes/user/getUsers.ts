import { GetUsersRequest, GetUsersResponse } from '@src/libs';
import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandlerMethod,
} from 'fastify';

import UserService from '../../services/userService';
import { paginationParamsSchema } from '../../utils/schema.utils';
import z from 'zod';

export type GetUsersRoutes = {
  Reply: GetUsersResponse;
  Querystring: GetUsersRequest;
};

export const getUsersQueriesSchema = z.object({}).and(paginationParamsSchema);

export const getUsers: RouteHandlerMethod<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  GetUsersRoutes
> = async (request) => {
  const { users, total } = await UserService.getUsers(request.query);
  return {
    data: users,
    metadata: {
      total,
    },
  };
};
