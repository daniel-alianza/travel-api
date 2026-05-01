import type { PrismaClient } from '../../generated/prisma/client';

const SEED_USER = {
  id: 1,
  name: 'Daniel Ortiz',
  email: 'daniel.ortiz@alianzaelectrica.com',
  password: 'daniel.ortiz@alianzaelectrica.com',
  companyId: 1,
  branchId: 1,
  roleId: 1,
  areaId: 1,
  isActive: true,
} as const;

type UserRecord = {
  readonly id: number;
  readonly email: string;
};

type UserCreateResult = {
  readonly id: number;
};

type PrismaClientWithUserDelegate = PrismaClient & {
  readonly user: {
    findFirst(args: {
      where: { OR: readonly [{ id: number }, { email: string }] };
      select: { id: true; email: true };
    }): Promise<UserRecord | null>;
    create(args: {
      data: {
        id: number;
        name: string;
        email: string;
        password: string;
        companyId: number;
        branchId: number;
        areaId: number;
        roleId: number;
        isActive: boolean;
      };
      select: { id: true };
    }): Promise<UserCreateResult>;
  };
};

export async function seedUsers(prismaClient: PrismaClient): Promise<number> {
  const prismaClientWithUser = prismaClient as PrismaClientWithUserDelegate;

  const existingUser = await prismaClientWithUser.user.findFirst({
    where: {
      OR: [{ id: SEED_USER.id }, { email: SEED_USER.email }],
    },
    select: { id: true, email: true },
  });

  if (existingUser) {
    return 0;
  }

  await prismaClientWithUser.user.create({
    data: {
      id: SEED_USER.id,
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: SEED_USER.password,
      companyId: SEED_USER.companyId,
      branchId: SEED_USER.branchId,
      areaId: SEED_USER.areaId,
      roleId: SEED_USER.roleId,
      isActive: SEED_USER.isActive,
    },
    select: { id: true },
  });

  return 1;
}
