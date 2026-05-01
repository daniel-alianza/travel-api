import type { PrismaClient } from '../../generated/prisma/client';

const BRANCH_NAMES: readonly string[] = [
  'Atizapan',
  'Culiacan',
  'Hermosillo',
  'La paz',
  'Leon',
  'Merida, Yucatan',
  'Monterrey',
  'Puebla',
  'Queretaro',
  'San Luis Potosi',
];

export async function seedBranches(
  prismaClient: PrismaClient,
): Promise<number> {
  const existingBranches = await prismaClient.branch.findMany({
    select: { name: true },
  });

  const existingBranchNames = new Set<string>(
    existingBranches.map((branch) => branch.name),
  );

  const branchesToCreate = BRANCH_NAMES.filter(
    (branchName) => !existingBranchNames.has(branchName),
  ).map((branchName) => ({ name: branchName }));

  if (branchesToCreate.length === 0) {
    return 0;
  }

  const result = await prismaClient.branch.createMany({
    data: branchesToCreate,
  });

  return result.count;
}
