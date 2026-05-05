import type { PrismaClient } from '../../generated/prisma/client';

type BranchSeed = {
  readonly name: string;
  readonly code?: string;
};

const BRANCH_SEEDS: readonly BranchSeed[] = [
  { name: 'Atizapan', code: '1002' },
  { name: 'Culiacan' },
  { name: 'Hermosillo' },
  { name: 'La paz' },
  { name: 'Leon', code: '1003' },
  { name: 'Merida, Yucatan' },
  { name: 'Monterrey', code: '1008' },
  { name: 'Puebla', code: '1014' },
  { name: 'Queretaro', code: '1001' },
  { name: 'San Luis Potosi', code: '1006' },
  { name: 'Baja Tension', code: '1016' },
];

function normalizeBranchName(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export async function seedBranches(
  prismaClient: PrismaClient,
): Promise<number> {
  const existingBranches = await prismaClient.branch.findMany({
    select: { name: true },
  });

  const existingByName = new Set<string>(
    existingBranches.map((branch) => normalizeBranchName(branch.name)),
  );

  const seenNames = new Set<string>();
  const uniqueSeeds = BRANCH_SEEDS.filter((branch) => {
    const normalizedName = normalizeBranchName(branch.name);
    if (seenNames.has(normalizedName)) {
      return false;
    }

    seenNames.add(normalizedName);
    return true;
  });

  const branchesToCreate = uniqueSeeds
    .filter((branch) => !existingByName.has(normalizeBranchName(branch.name)))
    .map((branch) => {
      const source = branch.code ? ('SAP_ALIANZA' as const) : undefined;
      return {
        name: branch.name,
        externalCode: branch.code,
        source,
      };
    });

  let affectedCount = 0;

  if (branchesToCreate.length > 0) {
    const createResult = await prismaClient.branch.createMany({
      data: branchesToCreate,
    });
    affectedCount += createResult.count;
  }

  const codedSeeds = uniqueSeeds.filter((branch) => branch.code);
  for (const branch of codedSeeds) {
    const updateResult = await prismaClient.branch.updateMany({
      where: { name: branch.name },
      data: {
        externalCode: branch.code,
        source: 'SAP_ALIANZA',
      },
    });
    affectedCount += updateResult.count;
  }

  return affectedCount;
}
