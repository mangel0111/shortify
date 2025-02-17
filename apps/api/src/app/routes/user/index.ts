import { CreateUserRoutes, createUser, createUserBodySchema } from './createUser';
import { GetUserByIdRoutes, getUserById, getUserByIdParamsSchema } from './getUserById';
import { GetUsersRoutes, getUsers } from './getUsers';

import { FastifyInstance } from 'fastify';
import { userExistsValidation } from '../../services/userService/userValidations';

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
    preValidation: [userExistsValidation],
    handler: getUserById,
    schema: {
        params: getUserByIdParamsSchema
    }
  });
  fastify.route<CreateUserRoutes>({
    method: 'POST',
    url: USER_ROUTE,
    handler: createUser,
    schema: {
        body: createUserBodySchema
    }
  });
};
