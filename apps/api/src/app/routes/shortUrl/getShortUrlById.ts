import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandlerMethod,
} from 'fastify';

import { GetShortUrlByIdResponse } from '@src/libs';
import ShortURLService from '../../services/shortUrlService';
import { dbIdSchema } from '../../utils/schema.utils';
import z from 'zod';

export type GetShortUrlByIdRoutes = {
  Params: {
    id: string;
  };
  Reply: GetShortUrlByIdResponse;
};

export const getShortUrlByIdParamsSchema = z
  .object({
    id: dbIdSchema().optional(),
  })
  .strict();

export const getShortUrlById: RouteHandlerMethod<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  GetShortUrlByIdRoutes
> = async (request, reply) => {
  const shortUrl = await ShortURLService.getShortUrlById(request.params.id);

  if (!shortUrl) {
    reply.notFound();
    return;
  }
  return {
    data: shortUrl,
  };
};
