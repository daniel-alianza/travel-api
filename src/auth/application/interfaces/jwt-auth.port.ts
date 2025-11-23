import { JwtPayload } from 'fg-portal-auth';

export interface JwtAuthPort {
  sign(payload: JwtPayload): Promise<string>;
  verify(token: string): Promise<any>;
  signRefreshToken(payload: JwtPayload): Promise<string>;
  verifyRefreshToken(token: string): Promise<JwtPayload>;
}

