import { Module } from '@nestjs/common';
import { AreaController } from './presentation/area.controller';
import { PrismaModule } from '../infraestructure/prisma/prisma.module';
import { PrismaAreaRepository } from './infraestructure/prisma-area.repository';
import { SeedAreasUseCase } from './application/use-cases/seed-areas.use-case';
import { GetAllAreasUseCase } from './application/use-cases/get-all-areas.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [AreaController],
  providers: [
    SeedAreasUseCase,
    GetAllAreasUseCase,
    PrismaAreaRepository,
    {
      provide: 'AreaRepository',
      useExisting: PrismaAreaRepository,
    },
  ],
  exports: [SeedAreasUseCase],
})
export class AreaModule {}
