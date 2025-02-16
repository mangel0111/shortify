import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandlerMethod,
} from 'fastify';

import {
GetUserByIdResponse,
} from '@src/libs';
import UserService from '../../services/userService';

export type GetUserByIdRoutes = {
  Reply: GetUserByIdResponse;
  Params: {
    id: string;
  };
};

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
