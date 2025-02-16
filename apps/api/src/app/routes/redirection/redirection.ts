import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandlerMethod,
} from 'fastify';

import ShortURLService from '../../services/shortUrlService';
import z from "zod";

export type RedirectRoute = {
  Params: {
    shortUrlId: string;
  };
};

export const redirectUrlParamSchema = z.object({
    shortUrlId: z.string().min(1).max(7),
})

export const redirectUrl: RouteHandlerMethod<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  RedirectRoute
> = async (request, reply) => {
  const shortUrlId = request.params.shortUrlId;
  const shortUrl = await ShortURLService.getShortUrlByShortId(shortUrlId);

  if (!shortUrl) {
    reply.notFound();
    return;
  }
  
  /**
   * Update click count
   *
   * This process is done asynchronously to avoid blocking the response.
   */
  ShortURLService.updateClickCountById(shortUrl.id);

  reply.redirect(shortUrl.attributes.originalUrl, 302);
};
