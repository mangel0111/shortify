/**
 * This file is used to export all the short URL routes
 */
import { CreateShortUrlRoutes, createShortUrls } from './createShortUrl';
import { GetShortUrlRoutes, getShortUrls } from './getShortUrls';

import { FastifyInstance } from 'fastify';

const SHORT_URL_ROUTE = '/short-url';

export const registerShortUrlRoutes = async (fastify: FastifyInstance) => {
  fastify.route<GetShortUrlRoutes>({
    method: 'GET',
    url: SHORT_URL_ROUTE,
    handler: getShortUrls,
  });
  fastify.route<CreateShortUrlRoutes>({
    method: 'POST',
    url: SHORT_URL_ROUTE,
    handler: createShortUrls,
  });
};
