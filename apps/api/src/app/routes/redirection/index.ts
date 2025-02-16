import { RedirectRoute, redirectUrl } from './redirection';

import { FastifyInstance } from 'fastify';

const REDIRECTION_ROUTE = '/:shortUrlId';

export const registerRedirectionRoutes = async (fastify: FastifyInstance) => {
    fastify.route<RedirectRoute>({
      method: 'GET',
      url: REDIRECTION_ROUTE,
      handler: redirectUrl,
    });
  };