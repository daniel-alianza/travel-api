import type { PrismaClient } from '../../generated/prisma/client';
import { Prisma } from '../../generated/prisma/client';

const ACCOUNT_CODE_SEEDS = [
  {
    code: '1120-027-000',
    name: 'FGE',
    companyName: 'FG Electrical',
  },
  {
    code: '1120-015-000',
    name: 'ALIANZA',
    companyName: 'Alianza Electrica',
  },
  {
    code: '1120-004-000',
    name: 'MANUFACTURING',
    companyName: 'FG Manufacturing',
  },
  {
    code: '_SYS00000000313',
    name: 'TYA',
    companyName: 'Tableros y Arrancadores',
  },
] as const;

type CompanyRecord = {
  readonly id: number;
  readonly name: string;
};

type ExistingAccountCodeRecord = {
  readonly code: string;
  readonly companyId: number;
};

type AccountCodeCreateRecord = {
  readonly code: string;
  readonly name: string;
  readonly companyId: number;
};

type AccountCodeCreateManyResult = {
  readonly count: number;
};

type PrismaClientWithAccountCodeDelegate = PrismaClient & {
  readonly company: {
    findMany(args: {
      select: { id: true; name: true };
    }): Promise<readonly CompanyRecord[]>;
  };
  readonly accountCode: {
    findMany(args: {
      where: { companyId: { in: readonly number[] } };
      select: { code: true; companyId: true };
    }): Promise<readonly ExistingAccountCodeRecord[]>;
    createMany(args: {
      data: readonly AccountCodeCreateRecord[];
    }): Promise<AccountCodeCreateManyResult>;
  };
};

export async function seedAccountCodes(
  prismaClient: PrismaClient,
): Promise<number> {
  const prismaClientWithAccountCode =
    prismaClient as PrismaClientWithAccountCodeDelegate;

  const companies = await prismaClientWithAccountCode.company.findMany({
    select: { id: true, name: true },
  });

  const companyIdByName = new Map<string, number>(
    companies.map((company) => [company.name, company.id]),
  );

  const accountCodesWithCompany: AccountCodeCreateRecord[] = [];
  for (const seed of ACCOUNT_CODE_SEEDS) {
    const companyId = companyIdByName.get(seed.companyName);
    if (companyId === undefined) {
      continue;
    }
    accountCodesWithCompany.push({
      code: seed.code,
      name: seed.name,
      companyId,
    });
  }

  if (accountCodesWithCompany.length === 0) {
    return 0;
  }

  try {
    const existingAccountCodes =
      await prismaClientWithAccountCode.accountCode.findMany({
        where: {
          companyId: {
            in: accountCodesWithCompany.map((seed) => seed.companyId),
          },
        },
        select: { code: true, companyId: true },
      });

    const existingKeys = new Set<string>(
      existingAccountCodes.map(
        (accountCode) =>
          `${accountCode.companyId.toString()}::${accountCode.code}`,
      ),
    );

    const accountCodesToCreate = accountCodesWithCompany.filter((seed) => {
      return !existingKeys.has(`${seed.companyId.toString()}::${seed.code}`);
    });

    if (accountCodesToCreate.length === 0) {
      return 0;
    }

    const result = await prismaClientWithAccountCode.accountCode.createMany({
      data: accountCodesToCreate,
    });

    return result.count;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      (error.code === 'P2021' || error.code === 'P2010')
    ) {
      throw new Error(
        'La tabla AccountCode no existe. Ejecuta primero las migraciones de Prisma y luego corre el seed.',
      );
    }
    throw error;
  }
}
