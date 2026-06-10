import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { CreateTravelRequestUseCase } from './application/use-cases/create-travel-request.use-case';
import { GetGasolineRequestFormDataUseCase } from './application/use-cases/get-gasoline-request-form-data.use-case';
import { GetTravelRequestFormDataUseCase } from './application/use-cases/get-travel-request-form-data.use-case';
import { GetUserFuelCardsUseCase } from './application/use-cases/get-user-fuel-cards.use-case';
import { GetApprovalRequestsUseCase } from './application/use-cases/get-approval-requests.use-case';
import { GetApprovalFilterCatalogUseCase } from './application/use-cases/get-approval-filter-catalog.use-case';
import { GetTravelRequestFormCatalogUseCase } from './application/use-cases/get-travel-request-form-catalog.use-case';
import { GetDispersionQueueUseCase } from './application/use-cases/get-dispersion-queue.use-case';
import { ExportDispersionReportUseCase } from './application/use-cases/export-dispersion-report.use-case';
import { ConfirmTravelRequestDispersionUseCase } from './application/use-cases/confirm-travel-request-dispersion.use-case';
import { ResolveTravelRequestTripUseCase } from './application/use-cases/resolve-travel-request-trip.use-case';
import { ResolveTravelRequestFromPowerAutomateUseCase } from './application/use-cases/resolve-travel-request-from-power-automate.use-case';
import { NotifyTravelRequestApprovedUseCase } from './application/use-cases/notify-travel-request-approved.use-case';
import { NotifyTravelRequestDispersedUseCase } from './application/use-cases/notify-travel-request-dispersed.use-case';
import { GetMyTravelRequestsUseCase } from './application/use-cases/get-my-travel-requests.use-case';
import { GetTravelRequestDetailForUserUseCase } from './application/use-cases/get-travel-request-detail-for-user.use-case';
import { CorrectRejectedTravelRequestTripUseCase } from './application/use-cases/correct-rejected-travel-request-trip.use-case';
import { ValidateTripFoodExpenseUseCase } from './application/use-cases/validate-trip-food-expense.use-case';
import { ValidateTripLodgingExpenseUseCase } from './application/use-cases/validate-trip-lodging-expense.use-case';
import { TravelRequestPrismaRepository } from './infrastructure/travel-request-prisma.repository';
import { TravelRequestController } from './presentation/travel-request.controller';
import { PowerAutomateSecretGuard } from './presentation/guards/power-automate-secret.guard';

@Module({
  imports: [AuthModule, NotificationsModule],
  controllers: [TravelRequestController],
  providers: [
    TravelRequestPrismaRepository,
    CreateTravelRequestUseCase,
    GetTravelRequestFormDataUseCase,
    GetGasolineRequestFormDataUseCase,
    GetUserFuelCardsUseCase,
    GetApprovalRequestsUseCase,
    GetApprovalFilterCatalogUseCase,
    GetTravelRequestFormCatalogUseCase,
    GetDispersionQueueUseCase,
    ExportDispersionReportUseCase,
    ConfirmTravelRequestDispersionUseCase,
    ResolveTravelRequestTripUseCase,
    ResolveTravelRequestFromPowerAutomateUseCase,
    NotifyTravelRequestApprovedUseCase,
    NotifyTravelRequestDispersedUseCase,
    GetMyTravelRequestsUseCase,
    GetTravelRequestDetailForUserUseCase,
    CorrectRejectedTravelRequestTripUseCase,
    ValidateTripFoodExpenseUseCase,
    ValidateTripLodgingExpenseUseCase,
    PowerAutomateSecretGuard,
    {
      provide: 'TravelRequestRepository',
      useExisting: TravelRequestPrismaRepository,
    },
  ],
  exports: ['TravelRequestRepository'],
})
export class TravelRequestModule {}
