import { CreateUserRequest, CreateUserResponse } from '@src/libs';
import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandlerMethod,
} from 'fastify';

import UserService from '../../services/userService';

export type CreateUserRoutes = {
  Body: CreateUserRequest;
  Reply: CreateUserResponse;
};

export const createUser: RouteHandlerMethod<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  CreateUserRoutes
> = async (request) => {
  const { email, firstName, lastName } = request.body;
  const user = await UserService.createUser({
    email,
    firstName,
    lastName,
  });
  return {
    data: user,
  };
};
