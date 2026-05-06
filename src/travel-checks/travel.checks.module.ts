import { Module } from '@nestjs/common';
import { SapConnectionModule } from '../infrastructure/SL/sap-connection.module';
import { ListDispersedTravelChecksUseCase } from './application/use-cases/list-dispersed-travel-checks.use-case';
import { ListExpenseDispersedTripsForUserUseCase } from './application/use-cases/list-expense-dispersed-trips-for-user.use-case';
import { ListExpenseTripMovementsForUserUseCase } from './application/use-cases/list-expense-trip-movements-for-user.use-case';
import { TravelChecksPrismaRepository } from './infrastructure/travel-checks-prisma.repository';
import { TravelChecksSapMovementsService } from './infrastructure/travel-checks-sap-movements.service';
import { TravelChecksController } from './presentation/travel-checks.controller';

@Module({
  imports: [SapConnectionModule],
  controllers: [TravelChecksController],
  providers: [
    TravelChecksPrismaRepository,
    TravelChecksSapMovementsService,
    ListDispersedTravelChecksUseCase,
    ListExpenseDispersedTripsForUserUseCase,
    ListExpenseTripMovementsForUserUseCase,
    {
      provide: 'TravelChecksRepository',
      useExisting: TravelChecksPrismaRepository,
    },
    {
      provide: 'TravelChecksSapMovementsPort',
      useExisting: TravelChecksSapMovementsService,
    },
  ],
})
export class TravelChecksModule {}
