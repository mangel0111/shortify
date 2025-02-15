import CacheService from '../../infrastructure/cache';
import DatabaseService from '../../infrastructure/database';
import { FastifyInstance } from 'fastify';

export const registerHealthRoutes = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'GET',
    url: '/health',
    handler: async () => {
      const isCacheOK = await CacheService.check();
      const isDbOK = await DatabaseService.check();
      return { service: true, cache: isCacheOK, db: isDbOK };
    },
  });
};
