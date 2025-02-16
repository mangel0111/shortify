import {
  CreateShortUrlRoutes,
  createShortUrlBodySchema,
  createShortUrls,
} from './createShortUrl';
import {
  GetShortUrlByIdRoutes,
  getShortUrlById,
  getShortUrlByIdParamsSchema,
} from './getShortUrlById';
import {
  GetShortUrlRoutes,
  getShortUrlQuerySchema,
  getShortUrls,
} from './getShortUrls';

import { FastifyInstance } from 'fastify';
import { userExistsValidation } from '../../services/userService/userValidations';

const SHORT_URL_ROUTE = '/short-url';

export const registerShortUrlRoutes = async (fastify: FastifyInstance) => {
  fastify.route<GetShortUrlRoutes>({
    method: 'GET',
    url: SHORT_URL_ROUTE,
    handler: getShortUrls,
    schema: {
      querystring: getShortUrlQuerySchema,
    },
  });
  fastify.route<GetShortUrlByIdRoutes>({
    method: 'GET',
    url: `${SHORT_URL_ROUTE}/:id`,
    handler: getShortUrlById,
    schema: {
      params: getShortUrlByIdParamsSchema,
    },
  });
  fastify.route<CreateShortUrlRoutes>({
    method: 'POST',
    url: SHORT_URL_ROUTE,
    preValidation: [userExistsValidation],
    handler: createShortUrls,
    schema: {
      body: createShortUrlBodySchema,
    },
  });
};
