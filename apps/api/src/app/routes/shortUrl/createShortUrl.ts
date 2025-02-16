import {
  CreateShortenUrlRequest,
  CreateShortenUrlResponse,
  UrlServiceType,
  generateShortIdWithCRC32,
} from '@src/libs';
import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandlerMethod,
} from 'fastify';

import { APIConfig } from '../../config';

export type CreateShortUrlRoutes = {
  Body: CreateShortenUrlRequest;
  Reply: CreateShortenUrlResponse;
};

export const createShortUrls: RouteHandlerMethod<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  CreateShortUrlRoutes
> = (request) => {
  const { originalUrl, userId } = request.body;
  const shortId = generateShortIdWithCRC32(originalUrl);
  return {
    data: {
      type: UrlServiceType.SHORT_URL,
      id: shortId,
      attributes: {
        originalUrl,
        shortUrl: `${APIConfig.commercialUrl}/${shortId}`,
        createdAt: new Date().toISOString(),
        userId: userId,
        clicks: 0,
      },
    },
  };
};
