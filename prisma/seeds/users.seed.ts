import type { PrismaClient } from '../../generated/prisma/client';

const SEED_USER = {
  id: 1,
  name: 'Daniel Ortiz',
  email: 'daniel.ortiz@alianzaelectrica.com',
  password: 'danielo10',
  companyId: 1,
  branchId: 1,
  roleId: 1,
  areaId: 1,
  isActive: true,
} as const;

const SEED_ACCOUNTING_USER = {
  id: 2,
  name: 'Contabilidad Alianza',
  email: 'contabilidad@alianzaelectrica.com',
  password: 'contaalianza10',
  companyId: 1,
  branchId: 1,
  roleId: 2,
  areaId: 8,
  isActive: true,
} as const;

const SEED_USERS = [SEED_USER, SEED_ACCOUNTING_USER] as const;

const SEED_CARDS = [
  {
    cardNumber: '2222222222222222',
    type: 'FUEL',
    userId: SEED_USER.id,
    companyId: SEED_USER.companyId,
    isActive: true,
    fuelName: 'Tarjeta fuel demo',
    fuelStatus: 'active',
  },
  {
    cardNumber: '5161020005113727',
    type: 'VIATIC',
    userId: SEED_USER.id,
    companyId: SEED_USER.companyId,
    isActive: true,
    fuelName: null,
    fuelStatus: null,
  },
] as const;

type UserRecord = {
  readonly id: number;
  readonly email: string;
};

type UserCreateResult = {
  readonly id: number;
};

type CardRecord = {
  readonly cardNumber: string;
};

type CardCreateManyResult = {
  readonly count: number;
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
  readonly card: {
    findMany(args: {
      where: { cardNumber: { in: readonly string[] } };
      select: { cardNumber: true };
    }): Promise<readonly CardRecord[]>;
    createMany(args: {
      data: readonly {
        cardNumber: string;
        type: 'FUEL' | 'VIATIC';
        userId: number;
        companyId: number;
        isActive: boolean;
        fuelName: string | null;
        fuelStatus: 'active' | null;
      }[];
    }): Promise<CardCreateManyResult>;
  };
};

export async function seedUsers(prismaClient: PrismaClient): Promise<number> {
  const prismaClientWithUser = prismaClient as PrismaClientWithUserDelegate;
  let insertedRecords = 0;

  for (const seedUser of SEED_USERS) {
    const existingUser = await prismaClientWithUser.user.findFirst({
      where: {
        OR: [{ id: seedUser.id }, { email: seedUser.email }],
      },
      select: { id: true, email: true },
    });

    if (existingUser) {
      continue;
    }

    await prismaClientWithUser.user.create({
      data: {
        id: seedUser.id,
        name: seedUser.name,
        email: seedUser.email,
        password: seedUser.password,
        companyId: seedUser.companyId,
        branchId: seedUser.branchId,
        areaId: seedUser.areaId,
        roleId: seedUser.roleId,
        isActive: seedUser.isActive,
      },
      select: { id: true },
    });
    insertedRecords += 1;
  }

  const existingCards = await prismaClientWithUser.card.findMany({
    where: {
      cardNumber: {
        in: SEED_CARDS.map((card) => card.cardNumber),
      },
    },
    select: { cardNumber: true },
  });

  const existingCardNumbers = new Set<string>(
    existingCards.map((card) => card.cardNumber),
  );

  const cardsToCreate = SEED_CARDS.filter(
    (card) => !existingCardNumbers.has(card.cardNumber),
  ).map((card) => ({
    cardNumber: card.cardNumber,
    type: card.type,
    userId: card.userId,
    companyId: card.companyId,
    isActive: card.isActive,
    fuelName: card.fuelName,
    fuelStatus: card.fuelStatus,
  }));

  if (cardsToCreate.length > 0) {
    const cardResult = await prismaClientWithUser.card.createMany({
      data: cardsToCreate,
    });
    insertedRecords += cardResult.count;
  }

  return insertedRecords;
}
