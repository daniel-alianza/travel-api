import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import type {
  AuthTokenService,
  AuthTokenVerifiedPayload,
} from '../../application/interfaces/auth-token.service.interface';
import { AuthConfigService } from '../../infrastructure/auth-config.service';

export type AuthenticatedRequest = Request & {
  readonly user?: AuthTokenVerifiedPayload;
};

@Injectable()
export class JwtSessionGuard implements CanActivate {
  constructor(
    @Inject('AUTH_TOKEN_SERVICE')
    private readonly authTokenService: AuthTokenService,
    private readonly authConfigService: AuthConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = extractTokenFromCookieHeader(
      request.headers.cookie,
      this.authConfigService.getConfig().jwtCookieName,
    );
    if (token === null) {
      throw new UnauthorizedException({
        message: 'No se encontró sesión activa.',
        error: 'No autenticado',
      });
    }
    const payload = this.authTokenService.verifyAccessToken(token);
    if (payload === null) {
      throw new UnauthorizedException({
        message: 'La sesión no es válida o expiró.',
        error: 'No autenticado',
      });
    }
    Object.assign(request, { user: payload });
    return true;
  }
}

function extractTokenFromCookieHeader(
  cookieHeader: string | undefined,
  cookieName: string,
): string | null {
  if (typeof cookieHeader !== 'string' || cookieHeader.trim().length === 0) {
    return null;
  }
  const cookies = cookieHeader.split(';');
  for (const cookie of cookies) {
    const [keyRaw, ...valueParts] = cookie.trim().split('=');
    const key = keyRaw?.trim();
    if (key === cookieName) {
      const value = valueParts.join('=').trim();
      return value.length > 0 ? value : null;
    }
  }
  return null;
}
