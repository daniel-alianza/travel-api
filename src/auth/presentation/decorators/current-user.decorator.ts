import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { AuthTokenVerifiedPayload } from '../../application/interfaces/auth-token.service.interface';
import type { AuthenticatedRequest } from '../guards/jwt-session.guard';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthTokenVerifiedPayload => {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    return request.user as AuthTokenVerifiedPayload;
  },
);
