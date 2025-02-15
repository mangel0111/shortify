import { GetShortUrlsRequest, GetShortUrlsResponse } from '@src/libs';
import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandlerMethod,
} from 'fastify';

import ShortURLService from '../../services/shortUrlService';
import UserService from '../../services/userService';
import { dbIdSchema } from '../../utils/schema.utils';
import z from 'zod';

export type GetShortUrlRoutes = {
  Reply: GetShortUrlsResponse;
  Querystring: GetShortUrlsRequest;
};

export const getShortUrlQuerySchema = z
  .object({
    userId: dbIdSchema().optional(),
  })
  .strict();

export const getShortUrls: RouteHandlerMethod<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  GetShortUrlRoutes
> = async (request) => {
  let shortUrlIds;
  if (request?.query?.userId) {
    const user = await UserService.getUserById(request.query.userId);
    shortUrlIds = user.attributes.urlsShortened.map((url) =>
      url.split('/').pop()
    );
  }
  const shortUrls = await ShortURLService.getShortUrls({
    shortUrlIds,
  });
  return {
    data: shortUrls,
  };
};
