import { GetShortUrlsResponse, UrlServiceType } from '@src/libs';
import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandlerMethod,
} from 'fastify';

export type GetShortUrlRoutes = {
  Reply: GetShortUrlsResponse;
};

export const getShortUrls: RouteHandlerMethod<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  GetShortUrlRoutes
> = () => {
  return {
    data: [
      {
        type: UrlServiceType.SHORT_URL,
        id: '123',
        attributes: {
          originalUrl: 'https://www.google.com',
          shortUrl: 'https://short.url/123',
          createdAt: new Date().toISOString(),
        },
      },
    ],
  };
};
