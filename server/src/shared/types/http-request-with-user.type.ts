import { FastifyRequest } from 'fastify';
import { HttpUserPayload } from './http-user-payload.type';

export type HttpRequestWithUserType = FastifyRequest & {
  user: HttpUserPayload;
};
