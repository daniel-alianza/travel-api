import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { SapPurchaseInvoicesModule } from '../sappurchaseinvoices/sappurchaseinvoices.module';
import { TravelChecksModule } from '../travel-checks/travel.checks.module';
import { ApproveTripMovementProofFinancialUseCase } from './application/use-cases/approve-trip-movement-proof-financial.use-case';
import { AccountingInvoiceController } from './presentation/accounting-invoice.controller';

@Module({
  imports: [AuthModule, SapPurchaseInvoicesModule, TravelChecksModule],
  controllers: [AccountingInvoiceController],
  providers: [ApproveTripMovementProofFinancialUseCase],
})
export class AccountingInvoiceModule {}
