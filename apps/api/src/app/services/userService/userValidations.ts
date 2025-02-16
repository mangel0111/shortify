import { FastifyReply, FastifyRequest } from 'fastify';

import { ErrorResponse } from '@src/libs';
import UserService from '.';

/**
 * Hook to check if a user exists on the current request
 */
export async function userExistsValidation(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const body = request?.body as { userId: string };
  const params = request?.params as { id: string };
  const userId = body?.userId ?? params?.id;

  const error: ErrorResponse = {
    errors: [
      {
        status: 404,
        title: 'User not found',
        detail: `'User not found for this id ${userId}'`,
      },
    ],
  };
  try {
    const user = await UserService.userExists(userId);
    if (!user) {
      reply.status(404).send(error);
    }
  } catch {
    reply.status(404).send(error);
  }
}
