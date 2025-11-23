import { Module } from '@nestjs/common';
import { BranchesController } from './presentation/branches.controller';
import { PrismaModule } from '../infraestructure/prisma/prisma.module';
import { SeedBranchesUseCase } from './application/use-cases/seed-branches.use-case';
import { PrismaBranchRepository } from './infraestructure/prisma-branch.repository';
import { GetAllBranchesUseCase } from './application/use-cases/get-all-branches.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [BranchesController],
  providers: [
    SeedBranchesUseCase,
    PrismaBranchRepository,
    GetAllBranchesUseCase,
    {
      provide: 'BranchRepository',
      useExisting: PrismaBranchRepository,
    },
  ],
  exports: [SeedBranchesUseCase],
})
export class BranchesModule {}

