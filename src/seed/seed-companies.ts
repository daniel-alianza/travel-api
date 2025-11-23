import { NestFactory } from '@nestjs/core';
import { CompaniesModule } from '../companies/companies.module';
import { SeedCompaniesUseCase } from '../companies/application/use-cases/seed-companies.use-case';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(CompaniesModule);
  const seeder = app.get(SeedCompaniesUseCase);
  await seeder.execute();
  await app.close();
  console.log('✅ Compañías insertadas');
}

bootstrap().catch((err) => {
  console.error('❌ Error al ejecutar el seeder:', err);
  process.exit(1);
});
