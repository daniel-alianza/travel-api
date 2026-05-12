export type AuthTokenPayload = {
  sub: string;
  email: string;
  role: string;
  /** Códigos IAM efectivos al iniciar sesión (para guards sin consultar BD). */
  iamPermissionCodes: readonly string[];
};

export type AuthTokenResult = {
  accessToken: string;
  expiresInSeconds: number;
};

export type AuthTokenVerifiedPayload = AuthTokenPayload & {
  iat: number;
  exp: number;
};

export interface AuthTokenService {
  signAccessToken(payload: AuthTokenPayload): AuthTokenResult;
  verifyAccessToken(token: string): AuthTokenVerifiedPayload | null;
}
