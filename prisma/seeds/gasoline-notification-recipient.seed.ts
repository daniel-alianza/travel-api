import type { PrismaClient } from '../../generated/prisma/client';

const TREASURY_APPROVER_EMAILS: readonly string[] = [
  'caroline.montenegro@alianzaelectrica.com',
  'leticia.obispo@alianzaelectrica.com',
  'edgar.sandoval@fgelectrical.com',
  'laura.jimenez@alianzaelectrica.com',
  'lorena.carrillo@alianzaelectrica.com',
  'melissa.alejandre@alianzaelectrica.com',
  'eduardo.martinez@fgelectrical.com',
];

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function seedGasolineNotificationRecipients(
  prismaClient: PrismaClient,
): Promise<number> {
  const users = await prismaClient.user.findMany({
    select: { id: true, email: true },
  });

  const userIdByEmail = new Map(
    users.map((user) => [normalizeEmail(user.email), user.id]),
  );

  let affected = 0;

  for (const email of TREASURY_APPROVER_EMAILS) {
    const userId = userIdByEmail.get(normalizeEmail(email));
    if (userId === undefined) {
      continue;
    }

    for (const role of ['treasury_approver', 'dispersal_notify'] as const) {
      await prismaClient.gasolineNotificationRecipient.upsert({
        where: {
          userId_role: { userId, role },
        },
        create: { userId, role, isActive: true },
        update: { isActive: true },
      });
      affected += 1;
    }
  }

  return affected;
}
