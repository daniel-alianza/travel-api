import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import type { AuthTokenVerifiedPayload } from '../../../auth/application/interfaces/auth-token.service.interface';
import type { AuthenticatedRequest } from '../../../auth/presentation/guards/jwt-session.guard';
import { IAM_PERMISO_ADMINISTRACION_USUARIOS } from '../../application/iam-known-permission-codes';

@Injectable()
export class SuperAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const usuario = request.user;
    if (usuario === undefined) {
      throw new ForbiddenException({
        message: 'No tienes permisos para esta operación.',
        error: 'Prohibido',
      });
    }
    const puedeIam =
      usuario.role === 'super_administrador' ||
      usuario.iamPermissionCodes.includes(IAM_PERMISO_ADMINISTRACION_USUARIOS);
    if (!puedeIam) {
      throw new ForbiddenException({
        message: 'No tienes permisos para esta operación.',
        error: 'Prohibido',
      });
    }
    return true;
  }
}
