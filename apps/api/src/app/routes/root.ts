import { FastifyInstance } from 'fastify';
import { registerHealthRoutes } from './health';
import { registerShortUrlRoutes } from './shortUrl';
import { registerUserRoutes } from './user';

export default async function (fastify: FastifyInstance) {
  // Default route
  fastify.get('/', async function () {
    return { message: 'Hello API' };
  });

  // Register health routes
  fastify.register(registerHealthRoutes);

  // Register short URL routes
  fastify.register(registerShortUrlRoutes);

  // Register user routes
  fastify.register(registerUserRoutes);
}
