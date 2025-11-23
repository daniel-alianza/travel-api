import { NestFactory } from '@nestjs/core';
import { BranchesModule } from '../branches/branches.module';
import { SeedBranchesUseCase } from '../branches/application/use-cases/seed-branches.use-case';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(BranchesModule);
  const seeder = app.get(SeedBranchesUseCase);
  await seeder.execute();
  await app.close();
  console.log('✅ Sucursales insertadas');
}

bootstrap().catch((err) => {
  console.error('❌ Error al ejecutar el seeder:', err);
  process.exit(1);
});
