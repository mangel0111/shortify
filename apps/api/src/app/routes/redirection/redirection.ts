import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandlerMethod,
} from 'fastify';

import ShortURLService from '../../services/shortUrlService';

export type RedirectRoute = {
  Params: {
    shortUrlId: string;
  };
};

export const redirectUrl: RouteHandlerMethod<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  RedirectRoute
> = async (request, reply) => {
  const shortUrlId = request.params.shortUrlId;
  const shortUrl = await ShortURLService.getShortUrlByShortId(shortUrlId);

  reply.redirect(shortUrl.attributes.originalUrl, 302);
};
