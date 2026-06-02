import type { PrismaClient } from '../../generated/prisma/client';

const PERMISO_UNIVERSAL_AUTOS = 'autos.reservar';

const PERMISSION_CODES = [
  'viajes.solicitar',
  'viajes.aprobar',
  'viaticos.dispersar',
  'contabilidad.autorizar',
  'tarjetas.asignar',
  'comprobacion.revisar',
  'gasolina.solicitar',
  'gasolina.autorizar',
  'gasolina.dispersar',
  'gasolina.reporte',
  'gasolina.rendimiento',
  PERMISO_UNIVERSAL_AUTOS,
  'admin.usuarios',
] as const;

type PermissionCode = (typeof PERMISSION_CODES)[number];

const PERMISOS_GASOLINA_OPERATIVOS: readonly PermissionCode[] = [
  'gasolina.solicitar',
  'gasolina.autorizar',
  'gasolina.dispersar',
  'gasolina.reporte',
  'gasolina.rendimiento',
];

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
    ...PERMISOS_GASOLINA_OPERATIVOS,
    PERMISO_UNIVERSAL_AUTOS,
  ],
  'lider/gerente': [
    'viajes.solicitar',
    'viajes.aprobar',
    'comprobacion.revisar',
    'gasolina.solicitar',
    'gasolina.autorizar',
    'gasolina.reporte',
    'gasolina.rendimiento',
    PERMISO_UNIVERSAL_AUTOS,
  ],
  colaborador: [
    'viajes.solicitar',
    'comprobacion.revisar',
    'gasolina.solicitar',
    PERMISO_UNIVERSAL_AUTOS,
  ],
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
