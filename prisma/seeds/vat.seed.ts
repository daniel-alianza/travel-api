import type { PrismaClient } from '../../generated/prisma/client';

type VatSeed = {
  readonly code: string;
  readonly name: string;
  readonly companyName: string;
};

type CompanyRecord = {
  readonly id: number;
  readonly name: string;
};

type ExistingVatRecord = {
  readonly code: string;
  readonly companyId: number;
};

type VatCreateRecord = {
  readonly code: string;
  readonly name: string;
  readonly companyId: number;
};

type VatCreateManyResult = {
  readonly count: number;
};

type VatDelegate = {
  findMany(args: {
    where: { companyId: { in: readonly number[] } };
    select: { code: true; companyId: true };
  }): Promise<readonly ExistingVatRecord[]>;
  createMany(args: {
    data: readonly VatCreateRecord[];
  }): Promise<VatCreateManyResult>;
};

type PrismaClientWithCompanyDelegate = PrismaClient & {
  readonly company: {
    findMany(args: {
      select: { id: true; name: true };
    }): Promise<readonly CompanyRecord[]>;
  };
};

const VAT_SEEDS: readonly VatSeed[] = [
  { name: 'IVA 16', code: 'IVA_C_16', companyName: 'Alianza Electrica' },
  { name: 'IVA 0', code: 'IVA_C_0', companyName: 'Alianza Electrica' },
  { name: 'IVA 8', code: 'IVA_C_8', companyName: 'Alianza Electrica' },
  { name: 'IVA 16', code: 'V2', companyName: 'FG Electrical' },
  { name: 'IVA 0', code: 'V0', companyName: 'FG Electrical' },
  { name: 'IVA 8', code: 'V8', companyName: 'FG Electrical' },
  { name: 'IVA 0', code: 'A0', companyName: 'FG Manufacturing' },
  { name: 'IVA 16', code: 'A2', companyName: 'FG Manufacturing' },
  { name: 'NO APLICA', code: 'A3', companyName: 'FG Manufacturing' },
  { name: 'IVA 0', code: 'IVA_C_0', companyName: 'Tableros y Arrancadores' },
  { name: 'IVA 16', code: 'IVA_C_16', companyName: 'Tableros y Arrancadores' },
];

export async function seedVat(prismaClient: PrismaClient): Promise<number> {
  const prismaWithCompany = prismaClient as PrismaClientWithCompanyDelegate;
  const vatDelegate = resolverVatDelegate(prismaClient);

  const companies = await prismaWithCompany.company.findMany({
    select: { id: true, name: true },
  });

  const companyIdByName = new Map<string, number>(
    companies.map((company) => [company.name, company.id]),
  );

  const vatsWithCompany = VAT_SEEDS.map((vatSeed) => ({
    code: vatSeed.code,
    name: vatSeed.name,
    companyId: companyIdByName.get(vatSeed.companyName) ?? null,
  })).filter((vatSeed): vatSeed is VatCreateRecord => {
    return vatSeed.companyId !== null;
  });

  if (vatsWithCompany.length === 0) {
    return 0;
  }

  const existingVats = await vatDelegate.findMany({
    where: {
      companyId: {
        in: vatsWithCompany.map((vat) => vat.companyId),
      },
    },
    select: { code: true, companyId: true },
  });

  const existingKeys = new Set<string>(
    existingVats.map((vat) => `${vat.companyId.toString()}::${vat.code}`),
  );

  const vatsToCreate = vatsWithCompany.filter((vat) => {
    return !existingKeys.has(`${vat.companyId.toString()}::${vat.code}`);
  });

  if (vatsToCreate.length === 0) {
    return 0;
  }

  const result = await vatDelegate.createMany({
    data: vatsToCreate,
  });

  return result.count;
}

function resolverVatDelegate(prismaClient: PrismaClient): VatDelegate {
  const maybePrisma = prismaClient as unknown as Record<string, unknown>;
  const vatFromLowercase = maybePrisma.vat;
  if (esVatDelegate(vatFromLowercase)) {
    return vatFromLowercase;
  }
  const vatFromAcronym = maybePrisma.vAT;
  if (esVatDelegate(vatFromAcronym)) {
    return vatFromAcronym;
  }
  throw new Error(
    'No se encontró el delegate VAT en PrismaClient. Verifica el cliente generado.',
  );
}

function esVatDelegate(value: unknown): value is VatDelegate {
  if (value === null || typeof value !== 'object') {
    return false;
  }
  const delegate = value as Record<string, unknown>;
  return (
    typeof delegate.findMany === 'function' &&
    typeof delegate.createMany === 'function'
  );
}
