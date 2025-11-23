import { NestFactory } from '@nestjs/core';
import { AreaModule } from '../area/area.module';
import { SeedAreasUseCase } from '../area/application/use-cases/seed-areas.use-case';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AreaModule);
  const seeder = app.get(SeedAreasUseCase);
  await seeder.execute();
  await app.close();
  console.log('✅ Áreas insertadas');
}

bootstrap().catch((err) => {
  console.error('❌ Error al ejecutar el seeder:', err);
  process.exit(1);
});

