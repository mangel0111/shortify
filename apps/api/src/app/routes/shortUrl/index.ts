import { CreateShortUrlRoutes, createShortUrls } from './createShortUrl';
import { GetShortUrlByIdRoutes, getShortUrlById } from './getShortUrlById';
import { GetShortUrlRoutes, getShortUrls } from './getShortUrls';

import { FastifyInstance } from 'fastify';
import { userExistsValidation } from '../../services/userService/userValidations';

const SHORT_URL_ROUTE = '/short-url';

export const registerShortUrlRoutes = async (fastify: FastifyInstance) => {
  fastify.route<GetShortUrlRoutes>({
    method: 'GET',
    url: SHORT_URL_ROUTE,
    handler: getShortUrls,
  });
  fastify.route<GetShortUrlByIdRoutes>({
    method: 'GET',
    url: `${SHORT_URL_ROUTE}/:id`,
    handler: getShortUrlById,
  });
  fastify.route<CreateShortUrlRoutes>({
    method: 'POST',
    url: SHORT_URL_ROUTE,
    preValidation: [userExistsValidation],
    handler: createShortUrls,
  });
};
