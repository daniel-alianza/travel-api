import type { Request } from 'express';
import type { AuthTokenVerifiedPayload } from '../../application/interfaces/auth-token.service.interface';

export type AuthenticatedRequest = Request & {
  readonly user?: AuthTokenVerifiedPayload;
};
