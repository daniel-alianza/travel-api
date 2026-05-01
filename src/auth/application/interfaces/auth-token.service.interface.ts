export type AuthTokenPayload = {
  sub: string;
  email: string;
  role: string;
};

export type AuthTokenResult = {
  accessToken: string;
  expiresInSeconds: number;
};

export interface AuthTokenService {
  signAccessToken(payload: AuthTokenPayload): AuthTokenResult;
}
