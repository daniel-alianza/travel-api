import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  esCodigoPermisoIamConocido,
  IAM_KNOWN_PERMISSION_CODES,
} from '../iam-known-permission-codes';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';

export type SetIamUserExtraPermissionsCommand = {
  targetUserId: number;
  extraPermissionCodes: readonly string[];
};

@Injectable()
export class SetIamUserExtraPermissionsUseCase {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: SetIamUserExtraPermissionsCommand): Promise<void> {
    const extras = [
      ...new Set(command.extraPermissionCodes.map((c) => c.trim())),
    ].filter((c) => c.length > 0);

    for (const code of extras) {
      if (!esCodigoPermisoIamConocido(code)) {
        throw new BadRequestException(
          `Código de permiso no válido: "${code}". Valores permitidos: ${IAM_KNOWN_PERMISSION_CODES.join(', ')}.`,
        );
      }
    }

    const usuario = await this.prismaService.user.findFirst({
      where: { id: command.targetUserId },
      select: { id: true, roleId: true },
    });

    if (usuario === null) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const defaults = await this.prismaService.roleDefaultPermission.findMany({
      where: { roleId: usuario.roleId },
      select: { permissionCode: true },
    });
    const codigosPorRol = new Set(defaults.map((row) => row.permissionCode));

    for (const code of extras) {
      if (codigosPorRol.has(code)) {
        throw new BadRequestException(
          `El permiso "${code}" ya está incluido por el rol del usuario y no puede guardarse como extra.`,
        );
      }
    }

    await this.prismaService.$transaction(async (tx) => {
      await tx.userExtraPermission.deleteMany({
        where: { userId: command.targetUserId },
      });
      if (extras.length > 0) {
        await tx.userExtraPermission.createMany({
          data: extras.map((permissionCode) => ({
            userId: command.targetUserId,
            permissionCode,
          })),
        });
      }
    });
  }
}
