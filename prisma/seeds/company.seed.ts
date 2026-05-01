import type { PrismaClient } from '../../generated/prisma/client';

const COMPANY_NAMES: readonly string[] = [
  'Alianza Electrica',
  'FG Electrical',
  'FG Manufacturing',
  'Tableros y Arrancadores',
];

export async function seedCompanies(
  prismaClient: PrismaClient,
): Promise<number> {
  const existingCompanies = await prismaClient.company.findMany({
    select: { name: true },
  });

  const existingCompanyNames = new Set<string>(
    existingCompanies.map((company) => company.name),
  );

  const companiesToCreate = COMPANY_NAMES.filter(
    (companyName) => !existingCompanyNames.has(companyName),
  ).map((companyName) => ({ name: companyName }));

  if (companiesToCreate.length === 0) {
    return 0;
  }

  const result = await prismaClient.company.createMany({
    data: companiesToCreate,
  });

  return result.count;
}
