import { Module } from '@nestjs/common';
import { PrismaModule } from '../infraestructure/prisma/prisma.module';
import { PrismaCardRepository } from './infraestructure/repositories';
import { CreateCardUseCase } from './application/use-cases/create-card.use-case';
import { TravelCardManagementController } from './presentation/travel-card-management.controller';
import { GetAllCardsUseCase } from './application/use-cases/get-all-cards.use-case';
import { GetCardByIdUseCase } from './application/use-cases/get-card-by-id.use-case';
import { UpdateCardUseCase } from './application/use-cases/update-card.use-case';
import { AssignCardUseCase } from './application/use-cases/assign-card.use-case';
import { UnassignCardUseCase } from './application/use-cases/unassign-card.use-case';
import { GetAssignmentsByCardIdUseCase } from './application/use-cases/get-assignments-by-card-id.use-case';
import { GetAssignmentsByUserIdsUseCase } from './application/use-cases/get-assignments-by-user-ids.use-case';
import { GetCardsByCompanyIdUseCase } from './application/use-cases/get-cards-by-company-id.use-case';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [TravelCardManagementController],
  providers: [
    PrismaCardRepository,
    CreateCardUseCase,
    UpdateCardUseCase,
    GetAllCardsUseCase,
    GetCardByIdUseCase,
    AssignCardUseCase,
    UnassignCardUseCase,
    GetAssignmentsByCardIdUseCase,
    GetAssignmentsByUserIdsUseCase,
    GetCardsByCompanyIdUseCase,
    {
      provide: 'CardRepository',
      useExisting: PrismaCardRepository,
    },
  ],
  exports: ['CardRepository', CreateCardUseCase],
})
export class TravelCardManagementModule {}
