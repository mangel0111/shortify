import Fastify, { FastifyInstance } from 'fastify';

import { UrlServiceType } from '@src/libs';
import { app } from './app';

describe('Core routes', () => {
  let server: FastifyInstance;

  beforeEach(() => {
    server = Fastify();
    server.register(app);
  });

  it('should respond with default message', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/',
    });

    expect(response.json()).toEqual({ message: 'Hello API' });
  });

  it.skip('should respond with health status', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/health',
    });

    expect(response.json()).toEqual({ ok: true });
  });

  it.skip('should respond with default routes created', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/short-url',
    });
    const jsonResponse = response.json();
    expect(jsonResponse).toBeDefined();
    const route = jsonResponse.data[0];

    expect(route.type).toEqual(UrlServiceType.SHORT_URL);
    expect(route.id).toEqual('123');
    expect(route.attributes.shortUrl).toEqual('https://short.url/123');
    expect(route.attributes.originalUrl).toEqual('https://www.google.com');
  });
});
