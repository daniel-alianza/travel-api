export type AuthConfig = {
  jwtSecret: string;
  jwtExpiresInSeconds: number;
  jwtCookieName: string;
  isProduction: boolean;
};
