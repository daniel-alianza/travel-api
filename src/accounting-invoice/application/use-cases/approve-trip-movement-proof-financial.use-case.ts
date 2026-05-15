import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type { DmsBucketConfig } from '../../../config/dms-bucket/dms';
import type { DmsStoragePort } from '../../../dms/application/interfaces/dms-storage.interface';
import {
  SAP_CORPORATE_CARD_BP_RESOLVER,
  type SapCorporateCardBusinessPartnerResolver,
} from '../../../sappurchaseinvoices/application/interfaces/sap-corporate-card-business-partner-resolver.interface';
import { CreatePurchaseInvoiceFromCfdiUseCase } from '../../../sappurchaseinvoices/application/use-cases/create-purchase-invoice-from-cfdi.use-case';
import { construirTextoComentariosFacturaSap } from '../../../sappurchaseinvoices/domain/sap-purchase-invoice-document-comments';
import type { CreatePurchaseInvoiceFromCfdiResultData } from '../../../sappurchaseinvoices/application/use-cases/create-purchase-invoice-from-cfdi.use-case';
import { parseCfdiXmlDataCommandFromXml } from '../../../sappurchaseinvoices/infrastructure/cfdi-xml-text-to-command.mapper';
import type {
  TravelChecksRepository,
  TripMovementProofAccountingSnapshot,
} from '../../../travel-checks/application/interfaces/travel-checks-repository.interface';

type ApproveTripMovementProofFinancialData = {
  readonly tripMovementProofId: number;
  readonly status: 'approved';
  readonly sap: CreatePurchaseInvoiceFromCfdiResultData;
};

export type ApproveTripMovementProofFinancialResponse =
  ApiSuccessResponse<ApproveTripMovementProofFinancialData>;

@Injectable()
export class ApproveTripMovementProofFinancialUseCase {
  private readonly logger = new Logger(
    ApproveTripMovementProofFinancialUseCase.name,
  );

  constructor(
    @Inject('TravelChecksRepository')
    private readonly travelChecksRepository: TravelChecksRepository,
    @Inject('DmsStoragePort')
    private readonly dmsStoragePort: DmsStoragePort,
    @Inject('DMS_BUCKET_CONFIG')
    private readonly dmsBucketConfig: DmsBucketConfig,
    @Inject(SAP_CORPORATE_CARD_BP_RESOLVER)
    private readonly sapCorporateCardBpResolver: SapCorporateCardBusinessPartnerResolver,
    private readonly createPurchaseInvoiceFromCfdiUseCase: CreatePurchaseInvoiceFromCfdiUseCase,
  ) {}

  async execute(input: {
    readonly proofId: number;
    readonly decidedByUserId: number;
    readonly accountCode: string;
    readonly taxCode: string;
    readonly costingCode?: string;
    readonly reviewerNotes?: string;
    readonly sapCardCode?: string;
  }): Promise<ApproveTripMovementProofFinancialResponse> {
    const snapshot: TripMovementProofAccountingSnapshot | null =
      await this.travelChecksRepository.findTripMovementProofAccountingSnapshot(
        input.proofId,
      );
    if (snapshot === null) {
      throw new NotFoundException({
        message: 'Comprobación no encontrada.',
        error: 'COMPROBACION_NO_ENCONTRADA',
      });
    }
    if (snapshot.status !== 'submitted') {
      throw new ConflictException({
        message: 'Esta comprobación ya fue aprobada o declinada.',
        error: 'COMPROBACION_YA_ATENDIDA',
      });
    }
    if (snapshot.proofType !== 'invoice') {
      throw new BadRequestException({
        message:
          'Solo las comprobaciones con factura (CFDI) pueden enviarse a SAP desde esta acción.',
        error: 'COMPROBACION_NO_FACTURA',
      });
    }

    const xmlFile =
      await this.travelChecksRepository.findTripMovementProofXmlFile({
        tripId: snapshot.tripId,
        movementSequence: snapshot.movementSequence,
      });
    if (xmlFile === null) {
      throw new BadRequestException({
        message: 'No hay XML de factura asociado a esta comprobación.',
        error: 'CFDI_XML_FALTANTE',
      });
    }

    const pdfFile =
      await this.travelChecksRepository.findTripMovementProofPdfFile({
        tripId: snapshot.tripId,
        movementSequence: snapshot.movementSequence,
      });

    const signed = await this.dmsStoragePort.createSignedDownloadUrl(
      xmlFile.filePath,
      this.dmsBucketConfig.signedUrlExpiresInSeconds,
    );
    const xmlText = await descargarXmlDesdeUrl(signed.signedUrl);
    const xmlData = parseCfdiXmlDataCommandFromXml(xmlText);

    const expenseCatalogCompanyId =
      await this.travelChecksRepository.resolveExpenseCatalogCompanyId(
        snapshot.corporateCardNumber,
        snapshot.companyId,
      );

    const sapCardCodeExplicito = input.sapCardCode?.trim() ?? '';
    let sapCardCode: string;
    let sapSessionCompanyIdOpcional: number | undefined;
    if (sapCardCodeExplicito.length > 0) {
      sapCardCode = sapCardCodeExplicito;
      sapSessionCompanyIdOpcional = undefined;
    } else {
      const tarjetaCorporativa = snapshot.corporateCardNumber?.trim() ?? '';
      const memoMovimiento = snapshot.movementMemo?.trim() ?? '';
      if (tarjetaCorporativa.length === 0 && memoMovimiento.length === 0) {
        throw new BadRequestException({
          message:
            'No hay tarjeta corporativa en la solicitud ni memo de movimiento; no se puede cruzar con Card/SAP (como en V1). Usa sapCardCode en el cuerpo o completa los datos del movimiento.',
          error: 'SAP_CARD_CODE_NO_RESUELTO',
        });
      }
      this.logger.log(
        `Accounting approve proofId=${String(input.proofId)}: resolución CardCode vía Card+SAP (corporateCard len=${String(tarjetaCorporativa.length)}, movementMemo len=${String(memoMovimiento.length)}, companyId=${String(snapshot.companyId)})`,
      );
      const resueltoCard =
        await this.sapCorporateCardBpResolver.resolvePurchaseInvoiceCardCode({
          companyId: snapshot.companyId,
          corporateCardNumber: tarjetaCorporativa,
          movementMemo: snapshot.movementMemo,
        });
      sapCardCode = resueltoCard.cardCode;
      sapSessionCompanyIdOpcional =
        resueltoCard.sapSessionCompanyId !== snapshot.companyId
          ? resueltoCard.sapSessionCompanyId
          : undefined;
      if (sapSessionCompanyIdOpcional !== undefined) {
        this.logger.log(
          `Accounting approve proofId=${String(input.proofId)}: OPCH se registrará con sesión SAP companyId=${String(sapSessionCompanyIdOpcional)} (viaje companyId=${String(snapshot.companyId)}).`,
        );
      }
    }

    let sapSessionCompanyIdParaComando = sapSessionCompanyIdOpcional;
    if (
      sapSessionCompanyIdParaComando === undefined &&
      expenseCatalogCompanyId !== snapshot.companyId
    ) {
      sapSessionCompanyIdParaComando = expenseCatalogCompanyId;
    }

    let sapResult: Awaited<
      ReturnType<CreatePurchaseInvoiceFromCfdiUseCase['execute']>
    >;
    try {
      sapResult = await this.createPurchaseInvoiceFromCfdiUseCase.execute(
        {
          companyId: snapshot.companyId,
          sapSessionCompanyId: sapSessionCompanyIdParaComando,
          sapCardCode,
          accountCode: input.accountCode.trim(),
          taxCode: input.taxCode.trim(),
          costingCode:
            input.costingCode !== undefined &&
            input.costingCode.trim().length > 0
              ? input.costingCode.trim()
              : undefined,
          comments: construirTextoComentariosFacturaSap({
            comentarioAlComprobar: snapshot.proofComment,
            notasRevisor: input.reviewerNotes,
          }),
          xmlData,
          sapDmsDocumentPaths: {
            xmlFilePath: xmlFile.filePath,
            ...(pdfFile !== null ? { pdfFilePath: pdfFile.filePath } : {}),
          },
        },
        input.decidedByUserId,
      );
    } catch (error: unknown) {
      const mensaje = error instanceof Error ? error.message : String(error);
      this.logger.error(
        `Fallo al ejecutar factura SAP (approve comprobación) proofId=${String(input.proofId)} tripId=${String(snapshot.tripId)} movementSeq=${String(snapshot.movementSequence)} companyId=${String(snapshot.companyId)} userId=${String(input.decidedByUserId)} sapCardCode=${sapCardCode}: ${mensaje}`,
        error instanceof Error ? error.stack : undefined,
      );
      throw error;
    }

    const marcado =
      await this.travelChecksRepository.markTripMovementProofApprovedIfSubmitted(
        input.proofId,
      );
    if (!marcado) {
      this.logger.warn(
        `SAP registró factura DocEntry=${String(sapResult.data.docEntry)} pero la comprobación id=${String(input.proofId)} ya no estaba en estado submitted.`,
      );
    }

    return buildSuccessResponse(
      {
        tripMovementProofId: input.proofId,
        status: 'approved' as const,
        sap: sapResult.data,
      },
      'Movimiento aprobado y factura registrada en SAP.',
    );
  }
}

async function descargarXmlDesdeUrl(signedUrl: string): Promise<string> {
  const response = await fetch(signedUrl);
  if (!response.ok) {
    throw new BadRequestException({
      message: 'No se pudo descargar el XML de la comprobación.',
      error: `HTTP ${String(response.status)}`,
    });
  }
  return response.text();
}
