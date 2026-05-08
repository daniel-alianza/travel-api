import type { PrismaClient } from '../../generated/prisma/client';

type ViaticCategorySeed = {
  readonly name: string;
  readonly code: string;
  readonly companyId: number;
};

type ExistingViaticCategoryRecord = {
  readonly code: string;
  readonly companyId: number;
};

type ViaticCategoryCreateRecord = {
  readonly name: string;
  readonly code: string;
  readonly companyId: number;
};

type ViaticCategoryCreateManyResult = {
  readonly count: number;
};

type ViaticCategoryDelegate = {
  findMany(args: {
    where: { companyId: { in: readonly number[] } };
    select: { code: true; companyId: true };
  }): Promise<readonly ExistingViaticCategoryRecord[]>;
  createMany(args: {
    data: readonly ViaticCategoryCreateRecord[];
  }): Promise<ViaticCategoryCreateManyResult>;
};

const VIATIC_CATEGORY_SEEDS: readonly ViaticCategorySeed[] = [
  { name: 'AVION', code: '6001-053-000', companyId: 1 },
  { name: 'HOSPEDAJE', code: '6001-056-000', companyId: 1 },
  { name: 'NO DEDUCIBLES', code: '6001-034-000', companyId: 1 },
  { name: 'ALIMENTACIÓN', code: '6001-055-000', companyId: 1 },
  { name: 'TRANSPORTACION PERSONAL', code: '6001-054-000', companyId: 1 },
  { name: 'CASETAS', code: '6001-052-000', companyId: 1 },
  { name: 'CONSUMO CON CLIENTES', code: '6001-073-000', companyId: 1 },
  { name: 'MTTO. EQUIPO DE TRANSPORTE', code: '6001-013-000', companyId: 1 },
  { name: 'COMBUSTIBLES Y LUBRICANTES', code: '6001-019-000', companyId: 1 },
  { name: 'OTROS IMPUESTOS', code: '6001-008-000', companyId: 1 },
  { name: 'TRANSPORTACION PERSONAL', code: '6001-054-000', companyId: 1 },
  { name: 'AVION', code: '6001-024-000', companyId: 2 },
  { name: 'HOSPEDAJE', code: '6001-025-000', companyId: 2 },
  { name: 'NO DEDUCIBLES', code: '6001-034-000', companyId: 2 },
  { name: 'ALIMENTACION', code: '6001-049-000', companyId: 2 },
  { name: 'TRANSPORTACION PERSONAL', code: '6001-054-000', companyId: 2 },
  { name: 'CASETAS', code: '6001-055-000', companyId: 2 },
  { name: 'CONSUMOS CON CLIENTES', code: '6001-073-000', companyId: 2 },
  {
    name: 'GASTOS DE VIAJES INTERNACIONALES',
    code: '6001-087-000',
    companyId: 2,
  },
  { name: 'MTTO. EQUIPO DE TRANSPORTE', code: '6001-013-000', companyId: 2 },
  { name: 'COMBUSTIBLES Y LUBRICANRES', code: '6001-019-000', companyId: 2 },
  { name: 'OTROS IMPUESTOS', code: '6001-008-000', companyId: 2 },
  { name: 'TRANSPORTACION PERSONAL', code: '6001-054-000', companyId: 2 },
  { name: 'MTTO. EQUIPO DE TRANSPORTE', code: '6001-013-000', companyId: 3 },
  { name: 'COMBUSTIBLES Y LUBRICANTES', code: '6001-019-000', companyId: 3 },
  { name: 'NO DEDUCIBLES', code: '6001-034-000', companyId: 3 },
  { name: 'TRANSPORTACION PERSONAL', code: '6001-054-000', companyId: 3 },
  { name: 'CASETAS', code: '6001-052-000', companyId: 3 },
  { name: 'AVION', code: '6001-053-000', companyId: 3 },
  { name: 'TRANSPORTACION PERSONAL', code: '6001-054-000', companyId: 3 },
  { name: 'ALIMENTACION', code: '6001-055-000', companyId: 3 },
  { name: 'HOSPEDAJE', code: '6001-056-000', companyId: 3 },
  { name: 'OTROS IMPUESTOS', code: '6001-008-000', companyId: 3 },
  { name: 'OTROS IMPUESTOS', code: '_SYS00000000174', companyId: 4 },
  { name: 'CONSUMOS CON CLIENTES', code: '_SYS00000000300', companyId: 4 },
  { name: 'MTTO. EQUIPO DE TRANSPORTE', code: '_SYS00000000179', companyId: 4 },
  { name: 'COMBUSTIBLES Y LUBRICANTES', code: '_SYS00000000181', companyId: 4 },
  { name: 'AVION', code: '_SYS00000000184', companyId: 4 },
  { name: 'ALIMENTOS', code: '_SYS00000000251', companyId: 4 },
  { name: 'HOSPEDAJE', code: '_SYS00000000185', companyId: 4 },
  { name: 'NO DEDUCIBLES', code: '_SYS00000000191', companyId: 4 },
  { name: 'TAXIS', code: '_SYS00000000206', companyId: 4 },
  { name: 'HERRAMIENTAS Y EQUIPO', code: '_SYS00000000202', companyId: 4 },
  { name: 'CASETAS', code: '_SYS00000000207', companyId: 4 },
  { name: 'TRANSPORTACION DE PERSONAL', code: '_SYS00000000205', companyId: 4 },
];

export async function seedViaticCategories(
  prismaClient: PrismaClient,
): Promise<number> {
  const viaticCategoryDelegate = resolverViaticCategoryDelegate(prismaClient);

  const deduplicatedSeeds = deduplicarSemillasPorCompaniaCodigo(
    VIATIC_CATEGORY_SEEDS,
  );

  if (deduplicatedSeeds.length === 0) {
    return 0;
  }

  const existingCategories = await viaticCategoryDelegate.findMany({
    where: {
      companyId: {
        in: deduplicatedSeeds.map((seed) => seed.companyId),
      },
    },
    select: { code: true, companyId: true },
  });

  const existingKeys = new Set<string>(
    existingCategories.map(
      (category) => `${category.companyId.toString()}::${category.code}`,
    ),
  );

  const categoriesToCreate = deduplicatedSeeds.filter((seed) => {
    return !existingKeys.has(`${seed.companyId.toString()}::${seed.code}`);
  });

  if (categoriesToCreate.length === 0) {
    return 0;
  }

  const result = await viaticCategoryDelegate.createMany({
    data: categoriesToCreate,
  });

  return result.count;
}

function deduplicarSemillasPorCompaniaCodigo(
  seeds: readonly ViaticCategorySeed[],
): ViaticCategoryCreateRecord[] {
  const mapByKey = new Map<string, ViaticCategoryCreateRecord>();
  for (const seed of seeds) {
    const key = `${seed.companyId.toString()}::${seed.code}`;
    if (!mapByKey.has(key)) {
      mapByKey.set(key, {
        name: seed.name,
        code: seed.code,
        companyId: seed.companyId,
      });
    }
  }
  return Array.from(mapByKey.values());
}

function resolverViaticCategoryDelegate(
  prismaClient: PrismaClient,
): ViaticCategoryDelegate {
  const maybePrisma = prismaClient as unknown as Record<string, unknown>;
  const candidateDelegate = maybePrisma.viaticCategory;
  if (esViaticCategoryDelegate(candidateDelegate)) {
    return candidateDelegate;
  }
  throw new Error(
    'No se encontró el delegate ViaticCategory en PrismaClient. Verifica el cliente generado.',
  );
}

function esViaticCategoryDelegate(
  value: unknown,
): value is ViaticCategoryDelegate {
  if (value === null || typeof value !== 'object') {
    return false;
  }
  const delegate = value as Record<string, unknown>;
  return (
    typeof delegate.findMany === 'function' &&
    typeof delegate.createMany === 'function'
  );
}
