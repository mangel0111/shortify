import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';

import Fastify from 'fastify';
import { app } from './app/app';
import cors from '@fastify/cors';
import rateLimitingPLugin from '@fastify/rate-limit';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

// Instantiate Fastify with some config
const server = Fastify({
  logger: true,
});
void server.register(cors, {
  // put your options here
});

void server.register(rateLimitingPLugin, {
  max: 404, // Max requests per second per pod
  timeWindow: '1 second',
  cache: 10000, // Cache size for rate limiting
  keyGenerator: (req) => req.ip, // Limit based on client IP
  errorResponseBuilder: () => {
    return {
      statusCode: 429,
      error: 'Too Many Requests',
      message: `Rate limit exceeded. Try again later.`
    };
  }
});

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

// Register your application as a normal plugin.
server.register(app);

// Start listening.
server.listen({ port, host }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  } else {
    console.log(`[ ready ] http://${host}:${port}`);
  }
});
