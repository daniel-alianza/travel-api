import type { PrismaClient } from '../../generated/prisma/client';
import { Prisma } from '../../generated/prisma/client';

const CURRENCY_SEEDS = [
  {
    companyName: 'FG Electrical',
    name: 'MXN',
    sapCurrencyCode: 'MN',
  },
  {
    companyName: 'FG Manufacturing',
    name: 'MXN',
    sapCurrencyCode: 'MXP',
  },
  {
    companyName: 'Tableros y Arrancadores',
    name: 'MXN',
    sapCurrencyCode: 'MXP',
  },
  {
    companyName: 'Alianza Electrica',
    name: 'MXN',
    sapCurrencyCode: 'MXN',
  },
] as const;

type CompanyRecord = {
  readonly id: number;
  readonly name: string;
};

type ExistingCurrencyRecord = {
  readonly name: string;
  readonly companyId: number;
};

type CurrencyCreateRecord = {
  readonly name: string;
  readonly sapCurrencyCode: string;
  readonly companyId: number;
};

type CurrencyCreateManyResult = {
  readonly count: number;
};

type PrismaClientWithCurrencyDelegate = PrismaClient & {
  readonly company: {
    findMany(args: {
      select: { id: true; name: true };
    }): Promise<readonly CompanyRecord[]>;
  };
  readonly currency: {
    findMany(args: {
      where: { companyId: { in: readonly number[] } };
      select: { name: true; companyId: true };
    }): Promise<readonly ExistingCurrencyRecord[]>;
    createMany(args: {
      data: readonly CurrencyCreateRecord[];
    }): Promise<CurrencyCreateManyResult>;
  };
};

export async function seedCurrencies(
  prismaClient: PrismaClient,
): Promise<number> {
  const prismaWithCurrency = prismaClient as PrismaClientWithCurrencyDelegate;

  const companies = await prismaWithCurrency.company.findMany({
    select: { id: true, name: true },
  });

  const companyIdByName = new Map<string, number>(
    companies.map((company) => [company.name, company.id]),
  );

  const currenciesWithCompany: CurrencyCreateRecord[] = [];
  for (const seed of CURRENCY_SEEDS) {
    const companyId = companyIdByName.get(seed.companyName);
    if (companyId === undefined) {
      continue;
    }
    currenciesWithCompany.push({
      name: seed.name,
      sapCurrencyCode: seed.sapCurrencyCode,
      companyId,
    });
  }

  if (currenciesWithCompany.length === 0) {
    return 0;
  }

  try {
    const existingCurrencies = await prismaWithCurrency.currency.findMany({
      where: {
        companyId: {
          in: currenciesWithCompany.map((row) => row.companyId),
        },
      },
      select: { name: true, companyId: true },
    });

    const existingKeys = new Set<string>(
      existingCurrencies.map(
        (row) => `${row.companyId.toString()}::${row.name}`,
      ),
    );

    const currenciesToCreate = currenciesWithCompany.filter((row) => {
      return !existingKeys.has(`${row.companyId.toString()}::${row.name}`);
    });

    if (currenciesToCreate.length === 0) {
      return 0;
    }

    const result = await prismaWithCurrency.currency.createMany({
      data: currenciesToCreate,
    });

    return result.count;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      (error.code === 'P2021' || error.code === 'P2010')
    ) {
      throw new Error(
        'La tabla Currency no existe. Ejecuta primero las migraciones de Prisma y luego corre el seed.',
      );
    }
    throw error;
  }
}
