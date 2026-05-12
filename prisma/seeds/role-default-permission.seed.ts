import type { PrismaClient } from '../../generated/prisma/client';

const PERMISSION_CODES = [
  'viajes.solicitar',
  'viajes.aprobar',
  'viaticos.dispersar',
  'contabilidad.autorizar',
  'tarjetas.asignar',
  'comprobacion.revisar',
  'admin.usuarios',
] as const;

type PermissionCode = (typeof PERMISSION_CODES)[number];

type RoleDefaultPermissionRow = {
  readonly roleId: number;
  readonly permissionCode: string;
};

type RoleDefaultPermissionCreateManyResult = {
  readonly count: number;
};

type RoleRecord = {
  readonly id: number;
};

type PrismaClientWithRoleDefaultPermissionDelegate = PrismaClient & {
  readonly role: {
    findFirst(args: {
      where: { name: string };
      select: { id: true };
    }): Promise<RoleRecord | null>;
  };
  readonly roleDefaultPermission: {
    deleteMany(args: { where: { roleId: number } }): Promise<{ count: number }>;
    createMany(args: {
      data: readonly RoleDefaultPermissionRow[];
    }): Promise<RoleDefaultPermissionCreateManyResult>;
  };
};

const DEFAULTS_BY_ROLE_NAME: Readonly<
  Record<string, readonly PermissionCode[]>
> = {
  super_administrador: [...PERMISSION_CODES],
  administrador: [
    'viajes.solicitar',
    'viajes.aprobar',
    'viaticos.dispersar',
    'contabilidad.autorizar',
    'tarjetas.asignar',
    'comprobacion.revisar',
  ],
  'lider/gerente': [
    'viajes.solicitar',
    'viajes.aprobar',
    'comprobacion.revisar',
  ],
  colaborador: ['viajes.solicitar', 'comprobacion.revisar'],
};

export async function seedRoleDefaultPermissions(
  prismaClient: PrismaClient,
): Promise<number> {
  const prisma =
    prismaClient as unknown as PrismaClientWithRoleDefaultPermissionDelegate;

  let inserted = 0;

  for (const [roleName, codes] of Object.entries(DEFAULTS_BY_ROLE_NAME)) {
    const role = await prisma.role.findFirst({
      where: { name: roleName },
      select: { id: true },
    });

    if (role === null) {
      console.warn(
        `[seedRoleDefaultPermissions] Rol no encontrado, se omite: ${roleName}`,
      );
      continue;
    }

    await prisma.roleDefaultPermission.deleteMany({
      where: { roleId: role.id },
    });

    const data: readonly RoleDefaultPermissionRow[] = codes.map(
      (permissionCode) => ({
        roleId: role.id,
        permissionCode,
      }),
    );

    const result = await prisma.roleDefaultPermission.createMany({
      data,
    });

    inserted += result.count;
  }

  return inserted;
}
