import type { PrismaClient } from '../../generated/prisma/client';

type GasolineSupplierSeed = {
  readonly code: string;
  readonly name: string;
  readonly companyName: string;
};

type CompanyRecord = {
  readonly id: number;
  readonly name: string;
};

type ExistingGasolineSupplierRecord = {
  readonly code: string;
  readonly companyId: number;
};

type GasolineSupplierCreateRecord = {
  readonly code: string;
  readonly name: string;
  readonly companyId: number;
};

type GasolineSupplierCreateManyResult = {
  readonly count: number;
};

type PrismaClientWithGasolineSupplierDelegate = PrismaClient & {
  readonly company: {
    findMany(args: {
      select: { id: true; name: true };
    }): Promise<readonly CompanyRecord[]>;
  };
  readonly gasolineSupplier: {
    findMany(args: {
      where: { companyId: { in: readonly number[] } };
      select: { code: true; companyId: true };
    }): Promise<readonly ExistingGasolineSupplierRecord[]>;
    createMany(args: {
      data: readonly GasolineSupplierCreateRecord[];
    }): Promise<GasolineSupplierCreateManyResult>;
  };
};

const GASOLINE_SUPPLIER_SEEDS: readonly GasolineSupplierSeed[] = [
  {
    code: '0897',
    name: 'EDENRED DE MEXICO SA DE CV',
    companyName: 'Alianza Electrica',
  },
  {
    code: '01229',
    name: 'EDENRED DE MEXICO SA DE CV',
    companyName: 'FG Electrical',
  },
  {
    code: 'P-0355',
    name: 'EDENRED DE MEXICO SA DE CV',
    companyName: 'FG Manufacturing',
  },
  {
    code: '00000148',
    name: 'EDENRED DE MEXICO SA DE CV',
    companyName: 'Tableros y Arrancadores',
  },
];

export async function seedGasolineSuppliers(
  prismaClient: PrismaClient,
): Promise<number> {
  const prismaClientWithGasolineSupplier =
    prismaClient as PrismaClientWithGasolineSupplierDelegate;

  const companies = await prismaClientWithGasolineSupplier.company.findMany({
    select: { id: true, name: true },
  });

  const companyIdByName = new Map<string, number>(
    companies.map((company) => [company.name, company.id]),
  );

  const suppliersWithCompany = GASOLINE_SUPPLIER_SEEDS.map((supplier) => ({
    code: supplier.code,
    name: supplier.name,
    companyId: companyIdByName.get(supplier.companyName) ?? null,
  })).filter((supplier): supplier is GasolineSupplierCreateRecord => {
    return supplier.companyId !== null;
  });

  if (suppliersWithCompany.length === 0) {
    return 0;
  }

  const existingSuppliers =
    await prismaClientWithGasolineSupplier.gasolineSupplier.findMany({
      where: {
        companyId: {
          in: suppliersWithCompany.map((supplier) => supplier.companyId),
        },
      },
      select: { code: true, companyId: true },
    });

  const existingKeys = new Set<string>(
    existingSuppliers.map(
      (supplier) => `${String(supplier.companyId ?? '')}::${supplier.code}`,
    ),
  );

  const suppliersToCreate = suppliersWithCompany.filter(
    (supplier) =>
      !existingKeys.has(`${supplier.companyId.toString()}::${supplier.code}`),
  );

  if (suppliersToCreate.length === 0) {
    return 0;
  }

  const result =
    await prismaClientWithGasolineSupplier.gasolineSupplier.createMany({
      data: suppliersToCreate,
    });

  return result.count;
}
