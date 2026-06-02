import 'dotenv/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../generated/prisma/client';
import { seedAreas } from './seeds/area.seed';
import { seedBranches } from './seeds/branch.seed';
import { seedCompanies } from './seeds/company.seed';
import { seedRoles } from './seeds/role.seed';
import { seedUsers } from './seeds/users.seed';
import { seedGasolineSuppliers } from './seeds/gasolinesupplier.seed';
import { seedAccountCodes } from './seeds/accountcode.seed';
import { seedCurrencies } from './seeds/currency.seed';
import { seedDistributionRules } from './seeds/distributionrule.seed';
import { seedVat } from './seeds/vat.seed';
import { seedViaticCategories } from './seeds/viaticcategory.seed';
import { seedRoleDefaultPermissions } from './seeds/role-default-permission.seed';
import { seedFuelCards } from './seeds/cards-fuel.seed';
import { seedGasolineNotificationRecipients } from './seeds/gasoline-notification-recipient.seed';

type SeederTask = {
  readonly name: string;
  readonly execute: (prismaClient: PrismaClient) => Promise<number>;
};

const prismaAdapter = new PrismaMariaDb({
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5,
});

const prismaClient = new PrismaClient({ adapter: prismaAdapter });

const seederTasks: readonly SeederTask[] = [
  {
    name: 'Compañías',
    execute: seedCompanies,
  },
  {
    name: 'Áreas',
    execute: seedAreas,
  },
  {
    name: 'Normas de reparto',
    execute: seedDistributionRules,
  },
  {
    name: 'Sucursales',
    execute: seedBranches,
  },
  {
    name: 'Roles',
    execute: seedRoles,
  },
  {
    name: 'Usuarios',
    execute: seedUsers,
  },
  {
    name: 'Proveedores de gasolina',
    execute: seedGasolineSuppliers,
  },
  {
    name: 'Account codes',
    execute: seedAccountCodes,
  },
  {
    name: 'Monedas SAP',
    execute: seedCurrencies,
  },
  {
    name: 'IVAs',
    execute: seedVat,
  },
  {
    name: 'Categorías de viáticos',
    execute: seedViaticCategories,
  },
  {
    name: 'Permisos por defecto de roles',
    execute: seedRoleDefaultPermissions,
  },
  {
    name: 'Tarjetas de combustible',
    execute: seedFuelCards,
  },
  {
    name: 'Destinatarios notificaciones gasolina',
    execute: seedGasolineNotificationRecipients,
  },
];

async function runSeeds(): Promise<void> {
  console.info('🌱 Iniciando proceso de seeders...');
  console.info(`📦 Total de seeders a ejecutar: ${seederTasks.length}`);

  let totalInsertedRecords = 0;

  for (const [index, seederTask] of seederTasks.entries()) {
    const seederPosition = index + 1;
    console.info(
      `🚀 Ejecutando seeder ${seederPosition}/${seederTasks.length}: ${seederTask.name}`,
    );

    const insertedRecords = await seederTask.execute(prismaClient);
    totalInsertedRecords += insertedRecords;

    console.info(
      `✅ Seeder completado: ${seederTask.name} | Registros insertados: ${insertedRecords}`,
    );
  }

  console.info('🎉 Todos los seeders se ejecutaron correctamente.');
  console.info(`🧾 Total de registros insertados: ${totalInsertedRecords}`);
}

runSeeds()
  .catch((error: unknown) => {
    console.error('❌ Error durante la ejecución de seeders:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prismaClient.$disconnect();
    console.info('🔌 Conexión de Prisma cerrada.');
  });
