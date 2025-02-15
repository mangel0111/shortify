import { FastifyInstance } from 'fastify';
import { registerShortUrlRoutes } from './shortUrlRoutes';

export default async function (fastify: FastifyInstance) {
  // Default route
  fastify.get('/', async function () {
    return { message: 'Hello API' };
  });

  fastify.get('/health', async function () {
    return { ok: true };
  });

  fastify.register(registerShortUrlRoutes);
}
