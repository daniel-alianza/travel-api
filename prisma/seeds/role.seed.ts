import type { PrismaClient } from '../../generated/prisma/client';

const ROLE_NAMES: readonly string[] = [
  'super_administrador',
  'administrador',
  'lider/gerente',
  'colaborador',
];

type RoleRecord = {
  readonly name: string;
};

type RoleCreateManyResult = {
  readonly count: number;
};

type PrismaClientWithRoleDelegate = PrismaClient & {
  readonly role: {
    findMany(args: { select: { name: true } }): Promise<readonly RoleRecord[]>;
    createMany(args: {
      data: readonly RoleRecord[];
    }): Promise<RoleCreateManyResult>;
  };
};

export async function seedRoles(prismaClient: PrismaClient): Promise<number> {
  const prismaClientWithRole = prismaClient as PrismaClientWithRoleDelegate;

  const existingRoles = await prismaClientWithRole.role.findMany({
    select: { name: true },
  });

  const existingRoleNames = new Set<string>(
    existingRoles.map((role) => role.name),
  );

  const rolesToCreate = ROLE_NAMES.filter(
    (roleName) => !existingRoleNames.has(roleName),
  ).map((roleName) => ({ name: roleName }));

  if (rolesToCreate.length === 0) {
    return 0;
  }

  const result = await prismaClientWithRole.role.createMany({
    data: rolesToCreate,
  });

  return result.count;
}
