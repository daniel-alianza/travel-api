import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CreateTravelRequestUseCase } from './application/use-cases/create-travel-request.use-case';
import { GetTravelRequestFormDataUseCase } from './application/use-cases/get-travel-request-form-data.use-case';
import { GetUserFuelCardsUseCase } from './application/use-cases/get-user-fuel-cards.use-case';
import { GetApprovalRequestsUseCase } from './application/use-cases/get-approval-requests.use-case';
import { GetApprovalFilterCatalogUseCase } from './application/use-cases/get-approval-filter-catalog.use-case';
import { GetDispersionQueueUseCase } from './application/use-cases/get-dispersion-queue.use-case';
import { ConfirmTravelRequestDispersionUseCase } from './application/use-cases/confirm-travel-request-dispersion.use-case';
import { ResolveTravelRequestTripUseCase } from './application/use-cases/resolve-travel-request-trip.use-case';
import { GetMyTravelRequestsUseCase } from './application/use-cases/get-my-travel-requests.use-case';
import { GetTravelRequestDetailForUserUseCase } from './application/use-cases/get-travel-request-detail-for-user.use-case';
import { CorrectRejectedTravelRequestTripUseCase } from './application/use-cases/correct-rejected-travel-request-trip.use-case';
import { ValidateTripFoodExpenseUseCase } from './application/use-cases/validate-trip-food-expense.use-case';
import { ValidateTripLodgingExpenseUseCase } from './application/use-cases/validate-trip-lodging-expense.use-case';
import { TravelRequestPrismaRepository } from './infrastructure/travel-request-prisma.repository';
import { TravelRequestController } from './presentation/travel-request.controller';

@Module({
  imports: [AuthModule],
  controllers: [TravelRequestController],
  providers: [
    TravelRequestPrismaRepository,
    CreateTravelRequestUseCase,
    GetTravelRequestFormDataUseCase,
    GetUserFuelCardsUseCase,
    GetApprovalRequestsUseCase,
    GetApprovalFilterCatalogUseCase,
    GetDispersionQueueUseCase,
    ConfirmTravelRequestDispersionUseCase,
    ResolveTravelRequestTripUseCase,
    GetMyTravelRequestsUseCase,
    GetTravelRequestDetailForUserUseCase,
    CorrectRejectedTravelRequestTripUseCase,
    ValidateTripFoodExpenseUseCase,
    ValidateTripLodgingExpenseUseCase,
    {
      provide: 'TravelRequestRepository',
      useExisting: TravelRequestPrismaRepository,
    },
  ],
})
export class TravelRequestModule {}
