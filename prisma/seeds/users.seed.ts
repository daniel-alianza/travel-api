import { hash } from 'bcrypt';
import type { PrismaClient } from '../../generated/prisma/client';

const BCRYPT_ROUNDS = 10;

const SEED_USER = {
  id: 1,
  name: 'Daniel Ortiz',
  email: 'daniel.ortiz@alianzaelectrica.com',
  password: 'CEgmWlCpnsQ8VoVg',
  companyId: 1,
  branchId: 1,
  roleId: 1,
  areaId: 1,
  isActive: true,
} as const;

const SEED_FERNANDO_USER = {
  id: 5,
  name: 'Fernando Mata Camacho',
  email: 'compras@alianzaelectrica.com',
  password: 'FeMa2026$',
  companyId: 2,
  branchId: 1,
  roleId: 2,
  areaId: 1,
  managerId: null,
  isActive: true,
} as const;

const SEED_JUAN_USER = {
  id: 6,
  name: 'Juan Carlos Morales',
  email: 'juan.morales@alianzaelectrica.com',
  password: 'JuCa2026$',
  companyId: 2,
  branchId: 1,
  roleId: 2,
  areaId: 20,
  managerId: SEED_FERNANDO_USER.id,
  isActive: true,
} as const;

const SEED_JOSE_USER = {
  id: 2,
  name: 'Jose Antonio Silveira Aguila',
  email: 'jose.silveira@fgelectrical.com',
  password: 'JoAn2026$',
  companyId: 2,
  branchId: 1,
  roleId: 3,
  areaId: 21,
  managerId: SEED_FERNANDO_USER.id,
  isActive: true,
} as const;

const SEED_CECILIA_USER = {
  id: 3,
  name: 'Cecilia Leon',
  email: 'cecilia.leon@fgelectrical.com',
  password: 'CeLe2026$',
  companyId: 2,
  branchId: 1,
  roleId: 4,
  areaId: 21,
  managerId: SEED_JOSE_USER.id,
  isActive: true,
} as const;

const SEED_ALBERTO_USER = {
  id: 4,
  name: 'Alberto Gomez',
  email: 'alberto.gomez@alianzaelectrica.com',
  password: 'AbGo2026$',
  companyId: 2,
  branchId: 1,
  roleId: 4,
  areaId: 21,
  managerId: SEED_JOSE_USER.id,
  isActive: true,
} as const;

const SEED_USERS = [
  SEED_USER,
  SEED_FERNANDO_USER,
  SEED_JUAN_USER,
  SEED_JOSE_USER,
  SEED_CECILIA_USER,
  SEED_ALBERTO_USER,
] as const;

const SEED_CARDS = [
  {
    cardNumber: '5161020004227593',
    type: 'VIATIC' as const,
    userId: SEED_JUAN_USER.id,
    companyId: SEED_JUAN_USER.companyId,
    isActive: true,
    fuelName: null,
    fuelStatus: null,
  },
  {
    cardNumber: '5161020004761047',
    type: 'VIATIC' as const,
    userId: SEED_JOSE_USER.id,
    companyId: SEED_JOSE_USER.companyId,
    isActive: true,
    fuelName: null,
    fuelStatus: null,
  },
  {
    cardNumber: '5161020004202646',
    type: 'VIATIC' as const,
    userId: SEED_CECILIA_USER.id,
    companyId: SEED_CECILIA_USER.companyId,
    isActive: true,
    fuelName: null,
    fuelStatus: null,
  },
  {
    cardNumber: '5161020004149144',
    type: 'VIATIC' as const,
    userId: SEED_ALBERTO_USER.id,
    companyId: SEED_ALBERTO_USER.companyId,
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
        managerId: number | null;
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
        type: 'VIATIC';
        userId: number;
        companyId: number;
        isActive: boolean;
        fuelName: null;
        fuelStatus: null;
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

    const passwordHash = await hash(seedUser.password, BCRYPT_ROUNDS);

    await prismaClientWithUser.user.create({
      data: {
        id: seedUser.id,
        name: seedUser.name,
        email: seedUser.email,
        password: passwordHash,
        companyId: seedUser.companyId,
        branchId: seedUser.branchId,
        areaId: seedUser.areaId,
        roleId: seedUser.roleId,
        managerId: 'managerId' in seedUser ? seedUser.managerId : null,
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
