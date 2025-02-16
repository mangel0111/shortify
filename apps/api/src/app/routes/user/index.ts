import { CreateUserRoutes, createUser } from './createUser';
import { GetUserByIdRoutes, getUserById } from './getUserById';
import { GetUsersRoutes, getUsers } from './getUsers';

import { FastifyInstance } from 'fastify';

const USER_ROUTE = '/user';

export const registerUserRoutes = async (fastify: FastifyInstance) => {
  fastify.route<GetUsersRoutes>({
    method: 'GET',
    url: USER_ROUTE,
    handler: getUsers,
  });
  fastify.route<GetUserByIdRoutes>({
    method: 'GET',
    url: `${USER_ROUTE}/:id`,
    handler: getUserById,
  });
  fastify.route<CreateUserRoutes>({
    method: 'POST',
    url: USER_ROUTE,
    handler: createUser,
  });
};
