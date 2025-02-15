import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandlerMethod,
} from 'fastify';

import { GetShortUrlsResponse } from '@src/libs';
import ShortURLService from '../../services/shortUrlService';

export type GetShortUrlRoutes = {
  Reply: GetShortUrlsResponse;
};

export const getShortUrls: RouteHandlerMethod<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  GetShortUrlRoutes
> = async () => {
  const shortUrls = await ShortURLService.getShortUrls();
  return {
    data: shortUrls,
  };
};
