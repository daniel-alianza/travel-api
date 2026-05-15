import { Module } from '@nestjs/common';
import { SapConnectionModule } from '../infrastructure/SL/sap-connection.module';
import { AuthModule } from '../auth/auth.module';
import { getDmsBucketConfig } from '../config/dms-bucket/dms';
import { SupabaseDmsStorageService } from '../dms/infrastructure/supabase-dms-storage.service';
import { ListDispersedTravelChecksUseCase } from './application/use-cases/list-dispersed-travel-checks.use-case';
import { ListExpenseDispersedTripsForUserUseCase } from './application/use-cases/list-expense-dispersed-trips-for-user.use-case';
import { ListExpenseTripMovementsForUserUseCase } from './application/use-cases/list-expense-trip-movements-for-user.use-case';
import { RequestTravelReconciliationCodeUseCase } from './application/use-cases/request-travel-reconciliation-code.use-case';
import { VerifyTravelReconciliationCodeUseCase } from './application/use-cases/verify-travel-reconciliation-code.use-case';
import { ListPendingTravelReconciliationsUseCase } from './application/use-cases/list-pending-travel-reconciliations.use-case';
import { DecideTravelReconciliationUseCase } from './application/use-cases/decide-travel-reconciliation.use-case';
import { SubmitTripMovementProofUseCase } from './application/use-cases/submit-trip-movement-proof.use-case';
import { ValidateTripMovementInvoiceProofDraftUseCase } from './application/use-cases/validate-trip-movement-invoice-proof-draft.use-case';
import { ListViaticDistributionRulesUseCase } from './application/use-cases/list-viatic-distribution-rules.use-case';
import { GetTripMovementCfdiUseCase } from './application/use-cases/get-trip-movement-cfdi.use-case';
import { GetTripMovementPdfUseCase } from './application/use-cases/get-trip-movement-pdf.use-case';
import { ListCompanyExpenseCatalogsUseCase } from './application/use-cases/list-company-expense-catalogs.use-case';
import { TravelChecksPrismaRepository } from './infrastructure/travel-checks-prisma.repository';
import { TravelChecksSapMovementsService } from './infrastructure/travel-checks-sap-movements.service';
import { TravelChecksController } from './presentation/travel-checks.controller';

@Module({
  imports: [SapConnectionModule, AuthModule],
  controllers: [TravelChecksController],
  providers: [
    TravelChecksPrismaRepository,
    TravelChecksSapMovementsService,
    ListDispersedTravelChecksUseCase,
    ListExpenseDispersedTripsForUserUseCase,
    ListExpenseTripMovementsForUserUseCase,
    RequestTravelReconciliationCodeUseCase,
    VerifyTravelReconciliationCodeUseCase,
    ListPendingTravelReconciliationsUseCase,
    DecideTravelReconciliationUseCase,
    SubmitTripMovementProofUseCase,
    ValidateTripMovementInvoiceProofDraftUseCase,
    ListViaticDistributionRulesUseCase,
    GetTripMovementCfdiUseCase,
    GetTripMovementPdfUseCase,
    ListCompanyExpenseCatalogsUseCase,
    SupabaseDmsStorageService,
    {
      provide: 'DMS_BUCKET_CONFIG',
      useFactory: () => getDmsBucketConfig(),
    },
    {
      provide: 'TravelChecksRepository',
      useExisting: TravelChecksPrismaRepository,
    },
    {
      provide: 'TravelChecksSapMovementsPort',
      useExisting: TravelChecksSapMovementsService,
    },
    {
      provide: 'DmsStoragePort',
      useExisting: SupabaseDmsStorageService,
    },
  ],
  exports: [
    TravelChecksPrismaRepository,
    {
      provide: 'TravelChecksRepository',
      useExisting: TravelChecksPrismaRepository,
    },
    SupabaseDmsStorageService,
    {
      provide: 'DmsStoragePort',
      useExisting: SupabaseDmsStorageService,
    },
    {
      provide: 'DMS_BUCKET_CONFIG',
      useFactory: () => getDmsBucketConfig(),
    },
  ],
})
export class TravelChecksModule {}
