import type { Request } from 'express';

export type SessionTokenSource = 'cookie' | 'bearer' | 'none';

export type ExtractedSessionToken = {
  readonly token: string | null;
  readonly source: SessionTokenSource;
};

export function extractSessionToken(
  request: Request,
  cookieName: string,
): ExtractedSessionToken {
  const fromCookie = extractTokenFromCookieHeader(
    request.headers.cookie,
    cookieName,
  );
  if (fromCookie !== null) {
    return { token: fromCookie, source: 'cookie' };
  }
  const fromBearer = extractBearerToken(request.headers.authorization);
  if (fromBearer !== null) {
    return { token: fromBearer, source: 'bearer' };
  }
  return { token: null, source: 'none' };
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

function extractBearerToken(
  authorizationHeader: string | undefined,
): string | null {
  if (
    typeof authorizationHeader !== 'string' ||
    authorizationHeader.trim().length === 0
  ) {
    return null;
  }
  const match = /^Bearer\s+(\S+)$/i.exec(authorizationHeader.trim());
  if (match === null) {
    return null;
  }
  const token = match[1]?.trim();
  return token !== undefined && token.length > 0 ? token : null;
}
