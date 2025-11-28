import { NestFactory } from '@nestjs/core';
import { StatusModule } from '../status/status.module';
import { SeedStatusUseCase } from '../status/application/use-cases/seed-status.use-case';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(StatusModule);
  const seeder = app.get(SeedStatusUseCase);
  await seeder.execute();
  await app.close();
  console.log('✅ Status insertados');
}

bootstrap().catch((err) => {
  console.error('❌ Error al ejecutar el seeder:', err);
  process.exit(1);
});
