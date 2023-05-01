import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { HttpRequestWithUserType } from '../types';

export const HttpUser: () => any = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request: HttpRequestWithUserType = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
