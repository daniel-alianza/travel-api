import type { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import {
  IAM_KNOWN_PERMISSION_CODES,
  ordenarCodigosPermisoIam,
} from '../../../iam/application/iam-known-permission-codes';

export async function resolveUserIamPermissionCodes(
  prismaService: PrismaService,
  userId: number,
  roleId: number,
  roleName: string,
): Promise<string[]> {
  if (roleName === 'super_administrador') {
    return [...IAM_KNOWN_PERMISSION_CODES];
  }

  const [defaults, extras] = await Promise.all([
    prismaService.roleDefaultPermission.findMany({
      where: { roleId },
      select: { permissionCode: true },
    }),
    prismaService.userExtraPermission.findMany({
      where: { userId },
      select: { permissionCode: true },
    }),
  ]);

  const efectivo = new Set<string>();
  for (const row of defaults) {
    efectivo.add(row.permissionCode);
  }
  for (const row of extras) {
    efectivo.add(row.permissionCode);
  }

  return ordenarCodigosPermisoIam(efectivo);
}
