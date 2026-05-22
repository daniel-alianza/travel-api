import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type {
  AuthTokenService,
  AuthTokenVerifiedPayload,
} from '../../application/interfaces/auth-token.service.interface';
import { AuthConfigService } from '../../infrastructure/auth-config.service';
import { extractSessionToken } from './extract-session-token';
import type { AuthenticatedRequest } from './jwt-session.guard.types';

export type { AuthenticatedRequest } from './jwt-session.guard.types';

@Injectable()
export class JwtSessionGuard implements CanActivate {
  constructor(
    @Inject('AUTH_TOKEN_SERVICE')
    private readonly authTokenService: AuthTokenService,
    private readonly authConfigService: AuthConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const cookieName = this.authConfigService.getConfig().jwtCookieName;
    const { token } = extractSessionToken(request, cookieName);
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
