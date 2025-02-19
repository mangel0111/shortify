import { GetShortUrlsRequest, GetShortUrlsResponse } from '@src/libs';
import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandlerMethod,
} from 'fastify';
import { dbIdSchema, paginationParamsSchema } from '../../utils/schema.utils';

import ShortURLService from '../../services/shortUrlService';
import UserService from '../../services/userService';
import z from 'zod';

export type GetShortUrlRoutes = {
  Reply: GetShortUrlsResponse;
  Querystring: GetShortUrlsRequest;
};

export const getShortUrlQuerySchema = z
  .object({
    userId: dbIdSchema().optional(),
  })
  .and(paginationParamsSchema);

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
  const { shortUrls, total } = await ShortURLService.getShortUrls({
    shortUrlIds,
    size: request.query.size,
    page: request.query.page,
  });
  return {
    data: shortUrls,
    metadata: {
      total,
    },
  };
};
