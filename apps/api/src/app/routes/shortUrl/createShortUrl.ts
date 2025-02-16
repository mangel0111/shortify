import { CreateShortenUrlRequest, CreateShortenUrlResponse } from '@src/libs';
import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandlerMethod,
} from 'fastify';

import ShortURLService from '../../services/shortUrlService';

export type CreateShortUrlRoutes = {
  Body: CreateShortenUrlRequest;
  Reply: CreateShortenUrlResponse;
};

export const createShortUrls: RouteHandlerMethod<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  CreateShortUrlRoutes
> = async (request) => {
  const { originalUrl, userId } = request.body;
  const shortUrl = await ShortURLService.createShortUrl({
    originalUrl,
    userId,
  });
  return {
    data: shortUrl,
  };
};
