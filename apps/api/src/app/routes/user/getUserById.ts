import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandlerMethod,
} from 'fastify';

import { GetUserByIdResponse } from '@src/libs';
import UserService from '../../services/userService';
import { dbIdSchema } from '../../utils/schema.utils';
import { z } from 'zod';

export type GetUserByIdRoutes = {
  Reply: GetUserByIdResponse;
  Params: {
    id: string;
  };
};

export const getUserByIdParamsSchema = z.object({
  id: dbIdSchema(),
});

export const getUserById: RouteHandlerMethod<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  GetUserByIdRoutes
> = async (request) => {
  const user = await UserService.getUserById(request.params.id);
  return {
    data: user,
  };
};
