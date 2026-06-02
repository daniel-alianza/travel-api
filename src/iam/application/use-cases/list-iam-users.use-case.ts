import { Inject, Injectable } from '@nestjs/common';
import type { Prisma } from '../../../../generated/prisma/client';
import type { GasolineNotificationRecipientRepository } from '../../../gasoline/application/interfaces/gasoline-notification-recipient.repository.interface';
import {
  IAM_PERMISOS_UNIVERSALES,
  ordenarCodigosPermisoIam,
} from '../iam-known-permission-codes';
import { iamRoleDbNameToLabel } from '../iam-role-db-to-label.mapper';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';

export type ListIamUsersCommand = {
  search: string;
};

export type IamUserListItemResponse = {
  id: number;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  jefeDirecto: string;
  correoElectronico: string;
  telefono: string;
  area: string;
  sucursal: string;
  rol: string;
  activo: boolean;
  /** Unión de permisos por rol + extras (orden estable). */
  permisos: readonly string[];
  /** Códigos otorgados por `RoleDefaultPermission` del rol actual; en UI no se pueden desmarcar. */
  permisosPorDefectoRol: readonly string[];
  readonly gasolinaTesoreriaAprobador: boolean;
  readonly gasolinaNotificacionDispersion: boolean;
};

@Injectable()
export class ListIamUsersUseCase {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject('GasolineNotificationRecipientRepository')
    private readonly gasolineNotificationRecipientRepository: GasolineNotificationRecipientRepository,
  ) {}

  async execute(
    command: ListIamUsersCommand,
  ): Promise<IamUserListItemResponse[]> {
    const term = command.search.trim();
    const where: Prisma.UserWhereInput | undefined =
      term.length === 0
        ? undefined
        : {
            OR: [
              { name: { contains: term } },
              { email: { contains: term } },
              { area: { name: { contains: term } } },
              { branch: { name: { contains: term } } },
              { role: { name: { contains: term } } },
              { manager: { name: { contains: term } } },
            ],
          };

    const rows = await this.prismaService.user.findMany({
      where,
      orderBy: { name: 'asc' },
      select: {
        id: true,
        roleId: true,
        name: true,
        email: true,
        isActive: true,
        area: { select: { name: true } },
        branch: { select: { name: true } },
        role: { select: { name: true } },
        manager: { select: { name: true } },
      },
    });

    if (rows.length === 0) {
      return [];
    }

    const roleIds = [...new Set(rows.map((row) => row.roleId))];
    const userIds = rows.map((row) => row.id);

    const [defaultsRows, extrasRows, gasolineFlagsByUserId] =
      await Promise.all([
        this.prismaService.roleDefaultPermission.findMany({
          where: { roleId: { in: roleIds } },
          select: { roleId: true, permissionCode: true },
        }),
        this.prismaService.userExtraPermission.findMany({
          where: { userId: { in: userIds } },
          select: { userId: true, permissionCode: true },
        }),
        this.gasolineNotificationRecipientRepository.findFlagsByUserIds(userIds),
      ]);

    const defaultsByRoleId = new Map<number, Set<string>>();
    for (const row of defaultsRows) {
      let set = defaultsByRoleId.get(row.roleId);
      if (set === undefined) {
        set = new Set();
        defaultsByRoleId.set(row.roleId, set);
      }
      set.add(row.permissionCode);
    }

    const extrasByUserId = new Map<number, Set<string>>();
    for (const row of extrasRows) {
      let set = extrasByUserId.get(row.userId);
      if (set === undefined) {
        set = new Set();
        extrasByUserId.set(row.userId, set);
      }
      set.add(row.permissionCode);
    }

    return rows.map((row) => {
      const jefeNombre = row.manager?.name?.trim() ?? '';
      const jefeDirecto =
        jefeNombre.length > 0 ? jefeNombre : 'Sin jefe directo asignado';
      const nombreCompleto = row.name.trim();

      const porDefecto = defaultsByRoleId.get(row.roleId) ?? new Set<string>();
      for (const codigo of IAM_PERMISOS_UNIVERSALES) {
        porDefecto.add(codigo);
      }
      const extras = extrasByUserId.get(row.id) ?? new Set<string>();
      const efectivo = new Set<string>([...porDefecto, ...extras]);
      for (const codigo of IAM_PERMISOS_UNIVERSALES) {
        efectivo.add(codigo);
      }

      const gasolineFlags = gasolineFlagsByUserId.get(row.id) ?? {
        treasuryApprover: false,
        dispersalNotify: false,
      };

      return {
        id: row.id,
        nombres: nombreCompleto,
        apellidoPaterno: '',
        apellidoMaterno: '',
        jefeDirecto,
        correoElectronico: row.email.trim().toLowerCase(),
        telefono: '',
        area: row.area.name.trim(),
        sucursal: row.branch.name.trim(),
        rol: iamRoleDbNameToLabel(row.role.name),
        activo: row.isActive,
        permisos: ordenarCodigosPermisoIam(efectivo),
        permisosPorDefectoRol: ordenarCodigosPermisoIam(porDefecto),
        gasolinaTesoreriaAprobador: gasolineFlags.treasuryApprover,
        gasolinaNotificacionDispersion: gasolineFlags.dispersalNotify,
      };
    });
  }
}
