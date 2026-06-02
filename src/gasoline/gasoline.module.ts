import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { SapConnectionModule } from '../infrastructure/SL/sap-connection.module';
import { PrismaModule } from '../infrastructure/prisma/prisma.module';
import { ApproveGasolineRequestUseCase } from './application/use-cases/approve-gasoline-request.use-case';
import { CancelApprovedGasolineRequestUseCase } from './application/use-cases/cancel-approved-gasoline-request.use-case';
import { CreateGasolineRequestUseCase } from './application/use-cases/create-gasoline-request.use-case';
import { DisburseGasolineRequestUseCase } from './application/use-cases/disburse-gasoline-request.use-case';
import { GetGasolineRequestByIdUseCase } from './application/use-cases/get-gasoline-request-by-id.use-case';
import { GetGasolineApprovalContextUseCase } from './application/use-cases/get-gasoline-approval-context.use-case';
import { GetGasolineReportUseCase } from './application/use-cases/get-gasoline-report.use-case';
import { GasolineNotificationRecipientService } from './application/services/gasoline-notification-recipient.service';
import { GetGasolineRequestHistoryUseCase } from './application/use-cases/get-gasoline-request-history.use-case';
import { ListApprovedGasolineRequestsUseCase } from './application/use-cases/list-approved-gasoline-requests.use-case';
import { ListGasolineCardsUseCase } from './application/use-cases/list-gasoline-cards.use-case';
import { ListGasolineAnticiposUseCase } from './application/use-cases/list-gasoline-anticipos.use-case';
import { ListPendingGasolineRequestsUseCase } from './application/use-cases/list-pending-gasoline-requests.use-case';
import { RejectGasolineRequestUseCase } from './application/use-cases/reject-gasoline-request.use-case';
import { SearchGasolineCardsUseCase } from './application/use-cases/search-gasoline-cards.use-case';
import { GasolineFuelCardResolverService } from './infrastructure/gasoline-fuel-card-resolver.service';
import { GasolineNotificationRecipientPrismaRepository } from './infrastructure/gasoline-notification-recipient-prisma.repository';
import { GasolineReportPrismaRepository } from './infrastructure/gasoline-report-prisma.repository';
import { GasolineRequestPrismaRepository } from './infrastructure/gasoline-request-prisma.repository';
import { SapGasolineCardsAdapter } from './infrastructure/sap-gasoline-cards.adapter';
import { SapGasolineDisbursementAdapter } from './infrastructure/sap-gasoline-disbursement.adapter';
import { GasolineController } from './presentation/gasoline.controller';

@Module({
  imports: [AuthModule, SapConnectionModule, PrismaModule],
  controllers: [GasolineController],
  exports: [
    GasolineNotificationRecipientService,
    'GasolineNotificationRecipientRepository',
  ],
  providers: [
    SapGasolineCardsAdapter,
    SapGasolineDisbursementAdapter,
    GasolineRequestPrismaRepository,
    GasolineReportPrismaRepository,
    GasolineNotificationRecipientPrismaRepository,
    GasolineNotificationRecipientService,
    GasolineFuelCardResolverService,
    SearchGasolineCardsUseCase,
    ListGasolineCardsUseCase,
    CreateGasolineRequestUseCase,
    ApproveGasolineRequestUseCase,
    RejectGasolineRequestUseCase,
    CancelApprovedGasolineRequestUseCase,
    DisburseGasolineRequestUseCase,
    ListPendingGasolineRequestsUseCase,
    ListApprovedGasolineRequestsUseCase,
    GetGasolineRequestHistoryUseCase,
    GetGasolineRequestByIdUseCase,
    GetGasolineReportUseCase,
    GetGasolineApprovalContextUseCase,
    ListGasolineAnticiposUseCase,
    {
      provide: 'GasolineSapCardsPort',
      useExisting: SapGasolineCardsAdapter,
    },
    {
      provide: 'GasolineDisbursementPort',
      useExisting: SapGasolineDisbursementAdapter,
    },
    {
      provide: 'GasolineRequestRepository',
      useExisting: GasolineRequestPrismaRepository,
    },
    {
      provide: 'GasolineReportRepository',
      useExisting: GasolineReportPrismaRepository,
    },
    {
      provide: 'GasolineNotificationRecipientRepository',
      useExisting: GasolineNotificationRecipientPrismaRepository,
    },
  ],
})
export class GasolineModule {}
