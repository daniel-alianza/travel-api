import { Inject, Injectable } from '@nestjs/common';
import { createHmac } from 'node:crypto';
import type { AuthConfig } from '../../application/interfaces/auth-config.interface';
import type {
  AuthTokenPayload,
  AuthTokenResult,
  AuthTokenService,
  AuthTokenVerifiedPayload,
} from '../../application/interfaces/auth-token.service.interface';

type JwtHeader = {
  alg: 'HS256';
  typ: 'JWT';
};

type JwtPayload = AuthTokenPayload & {
  iat: number;
  exp: number;
};

@Injectable()
export class HmacJwtService implements AuthTokenService {
  constructor(@Inject('AUTH_CONFIG') private readonly authConfig: AuthConfig) {}

  signAccessToken(payload: AuthTokenPayload): AuthTokenResult {
    const issuedAt = Math.floor(Date.now() / 1000);
    const expiresAt = issuedAt + this.authConfig.jwtExpiresInSeconds;

    const header: JwtHeader = { alg: 'HS256', typ: 'JWT' };
    const tokenPayload: JwtPayload = {
      ...payload,
      iat: issuedAt,
      exp: expiresAt,
    };

    const encodedHeader = this.base64UrlEncode(JSON.stringify(header));
    const encodedPayload = this.base64UrlEncode(JSON.stringify(tokenPayload));
    const dataToSign = `${encodedHeader}.${encodedPayload}`;
    const signature = this.base64UrlEncodeBuffer(
      createHmac('sha256', this.authConfig.jwtSecret)
        .update(dataToSign)
        .digest(),
    );

    return {
      accessToken: `${dataToSign}.${signature}`,
      expiresInSeconds: this.authConfig.jwtExpiresInSeconds,
    };
  }

  private base64UrlEncode(value: string): string {
    return Buffer.from(value, 'utf8').toString('base64url');
  }

  private base64UrlEncodeBuffer(value: Buffer): string {
    return value.toString('base64url');
  }

  verifyAccessToken(token: string): AuthTokenVerifiedPayload | null {
    const pieces = token.split('.');
    if (pieces.length !== 3) {
      return null;
    }
    const [encodedHeader, encodedPayload, signature] = pieces;
    const expectedSignature = this.base64UrlEncodeBuffer(
      createHmac('sha256', this.authConfig.jwtSecret)
        .update(`${encodedHeader}.${encodedPayload}`)
        .digest(),
    );
    if (expectedSignature !== signature) {
      return null;
    }
    try {
      const payloadJson = Buffer.from(encodedPayload, 'base64url').toString(
        'utf8',
      );
      const payload = JSON.parse(payloadJson) as AuthTokenVerifiedPayload;
      if (
        typeof payload.sub !== 'string' ||
        typeof payload.email !== 'string' ||
        typeof payload.role !== 'string' ||
        typeof payload.exp !== 'number' ||
        typeof payload.iat !== 'number'
      ) {
        return null;
      }
      const rawCodes = (payload as { iamPermissionCodes?: unknown })
        .iamPermissionCodes;
      const iamPermissionCodes: string[] =
        Array.isArray(rawCodes) &&
        rawCodes.length > 0 &&
        rawCodes.every((item) => typeof item === 'string')
          ? [...rawCodes]
          : [];
      const nowSeconds = Math.floor(Date.now() / 1000);
      if (payload.exp <= nowSeconds) {
        return null;
      }
      return {
        ...payload,
        iamPermissionCodes,
      };
    } catch {
      return null;
    }
  }
}
