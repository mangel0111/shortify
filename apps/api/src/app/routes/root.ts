import { FastifyInstance } from 'fastify';
import { registerHealthRoutes } from './health';
import { registerShortUrlRoutes } from './shortUrlRoutes';

export default async function (fastify: FastifyInstance) {
  // Default route
  fastify.get('/', async function () {
    return { message: 'Hello API' };
  });

  fastify.register(registerHealthRoutes);

  fastify.register(registerShortUrlRoutes);
}
