import { Module } from '@nestjs/common';
import { PrismaModule } from '../infraestructure/prisma/prisma.module';
import { PrismaStatusRepository } from './infraestructure/prisma-status.repository';
import { SeedStatusUseCase } from './application/use-cases/seed-status.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [
    SeedStatusUseCase,
    PrismaStatusRepository,
    {
      provide: 'StatusRepository',
      useExisting: PrismaStatusRepository,
    },
  ],
  exports: [SeedStatusUseCase],
})
export class StatusModule {}
