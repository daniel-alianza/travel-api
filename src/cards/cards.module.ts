import { Module } from '@nestjs/common';
import { AssignCardToUserUseCase } from './application/use-cases/assign-card-to-user.use-case';
import { DeactivateUserCardUseCase } from './application/use-cases/deactivate-user-card.use-case';
import { GetCardAssignmentUsersUseCase } from './application/use-cases/get-card-assignment-users.use-case';
import { GetCardAssignmentFilterCatalogUseCase } from './application/use-cases/get-card-assignment-filter-catalog.use-case';
import { CardPrismaRepository } from './infrastructure/card-prisma.repository';
import { FuelCardSapSyncService } from './infrastructure/fuel-card-sap-sync.service';
import { CardsController } from './presentation/cards.controller';
import { SapConnectionModule } from '../infrastructure/SL/sap-connection.module';

@Module({
  imports: [SapConnectionModule],
  controllers: [CardsController],
  providers: [
    CardPrismaRepository,
    FuelCardSapSyncService,
    GetCardAssignmentUsersUseCase,
    GetCardAssignmentFilterCatalogUseCase,
    AssignCardToUserUseCase,
    DeactivateUserCardUseCase,
    {
      provide: 'CardRepository',
      useExisting: CardPrismaRepository,
    },
  ],
})
export class CardsModule {}
