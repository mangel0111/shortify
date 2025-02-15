import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandlerMethod,
} from 'fastify';

import { GetShortUrlByIdResponse } from '@src/libs';
import ShortURLService from '../../services/shortUrlService';

export type GetShortUrlByIdRoutes = {
  Querystring: {
    id: string;
  }
  Reply: GetShortUrlByIdResponse;
};

export const getShortUrlById: RouteHandlerMethod<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  GetShortUrlByIdRoutes
> = async (request) => {
  const shortUrl = await ShortURLService.getShortUrlById(request.query.id);
  return {
    data: shortUrl,
  };
};
