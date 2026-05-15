import { Module } from '@nestjs/common';
import { DmsModule } from '../dms/dms.module';
import { SapConnectionModule } from '../infrastructure/SL/sap-connection.module';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../infrastructure/prisma/prisma.module';
import { CreatePurchaseInvoiceFromCfdiUseCase } from './application/use-cases/create-purchase-invoice-from-cfdi.use-case';
import { SAP_CORPORATE_CARD_BP_RESOLVER } from './application/interfaces/sap-corporate-card-business-partner-resolver.interface';
import { PrismaCompanySapCurrencyResolver } from './infrastructure/prisma-company-sap-currency-resolver.service';
import { SapPurchaseInvoiceHttpWriter } from './infrastructure/sap-purchase-invoice-http.writer';
import { CfdiSapPurchaseInvoiceAssembler } from './infrastructure/cfdi-sap-purchase-invoice-assembler.service';
import { SapServiceLayerCorporateCardBusinessPartnerResolver } from './infrastructure/sap-service-layer-corporate-card-bp-resolver.service';
import { SapPurchaseInvoicesController } from './presentation/sappurchaseinvoices.controller';

@Module({
  imports: [SapConnectionModule, AuthModule, PrismaModule, DmsModule],
  controllers: [SapPurchaseInvoicesController],
  providers: [
    CreatePurchaseInvoiceFromCfdiUseCase,
    PrismaCompanySapCurrencyResolver,
    SapPurchaseInvoiceHttpWriter,
    CfdiSapPurchaseInvoiceAssembler,
    SapServiceLayerCorporateCardBusinessPartnerResolver,
    {
      provide: 'CompanySapCurrencyResolver',
      useExisting: PrismaCompanySapCurrencyResolver,
    },
    {
      provide: 'SapPurchaseInvoiceWriter',
      useExisting: SapPurchaseInvoiceHttpWriter,
    },
    {
      provide: SAP_CORPORATE_CARD_BP_RESOLVER,
      useExisting: SapServiceLayerCorporateCardBusinessPartnerResolver,
    },
  ],
  exports: [
    CreatePurchaseInvoiceFromCfdiUseCase,
    SAP_CORPORATE_CARD_BP_RESOLVER,
  ],
})
export class SapPurchaseInvoicesModule {}
