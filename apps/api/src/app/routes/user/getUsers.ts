import { GetUsersRequest, GetUsersResponse } from '@src/libs';
import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandlerMethod,
} from 'fastify';

import UserService from '../../services/userService';
import z from 'zod';

export type GetUsersRoutes = {
  Reply: GetUsersResponse;
  Querystring: GetUsersRequest;
};

export const getUsersQueriesSchema = z.object({
  size: z.coerce.number().int().positive().max(100).default(10),
  page: z.coerce.number().int().positive().default(1),
});

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
