import { CreateShortenUrlResponse, UrlServiceType } from '@src/libs';
import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandlerMethod,
} from 'fastify';

export type CreateShortUrlRoutes = {
  Reply: CreateShortenUrlResponse;
};

export const createShortUrls: RouteHandlerMethod<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  CreateShortUrlRoutes
> = () => {
  return {
    data: {
      type: UrlServiceType.SHORT_URL,
      id: '123',
      attributes: {
        originalUrl: 'https://www.google.com',
        shortUrl: 'https://short.url/123',
        createdAt: new Date().toISOString(),
      },
    },
  };
};
