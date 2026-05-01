import { Injectable, InternalServerErrorException } from '@nestjs/common';
import type { AuthConfig } from '../application/interfaces/auth-config.interface';

@Injectable()
export class AuthConfigService {
  getConfig(): AuthConfig {
    const jwtSecret = process.env.AUTH_JWT_SECRET ?? '';
    const jwtExpiresInSeconds = Number(
      process.env.AUTH_JWT_EXPIRES_IN_SECONDS ?? 3600,
    );
    const jwtCookieName = process.env.AUTH_JWT_COOKIE_NAME ?? 'travel_session';
    const isProduction =
      (process.env.NODE_ENV ?? '').toLowerCase() === 'production';

    if (!jwtSecret || Number.isNaN(jwtExpiresInSeconds)) {
      throw new InternalServerErrorException(
        'Faltan variables de entorno de autenticación',
      );
    }

    return {
      jwtSecret,
      jwtExpiresInSeconds,
      jwtCookieName,
      isProduction,
    };
  }
}
