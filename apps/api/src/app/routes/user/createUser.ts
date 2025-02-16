import { CreateUserRequest, CreateUserResponse } from '@src/libs';
import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandlerMethod,
} from 'fastify';

import UserService from '../../services/userService';
import z from 'zod';

export type CreateUserRoutes = {
  Body: CreateUserRequest;
  Reply: CreateUserResponse;
};

export const createUserBodySchema = z
  .object({
    name: z.string().max(255),
  })
  .strict();

export const createUser: RouteHandlerMethod<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  CreateUserRoutes
> = async (request) => {
  const { name } = request.body;
  const user = await UserService.createUser({
    name,
  });
  return {
    data: user,
  };
};
