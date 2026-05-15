import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import type { DmsBucketConfig } from '../../../config/dms-bucket/dms';
import type { DmsStoragePort } from '../../../dms/application/interfaces/dms-storage.interface';
import { SapAuthAdapter } from '../../../infrastructure/SL/sap-auth.adapter';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type { CreatePurchaseInvoiceFromCfdiCommand } from '../interfaces/create-purchase-invoice-from-cfdi-command.interface';
import type { CompanySapCurrencyResolver } from '../interfaces/company-sap-currency-resolver.interface';
import type { SapCreatedPurchaseInvoiceRecord } from '../interfaces/sap-created-purchase-invoice.interface';
import type { SapPurchaseInvoiceWriter } from '../interfaces/sap-purchase-invoice-writer.interface';
import type { ServiceLayerPurchaseInvoicePayload } from '../interfaces/service-layer-purchase-invoice.interface';
import { CfdiSapPurchaseInvoiceAssembler } from '../../infrastructure/cfdi-sap-purchase-invoice-assembler.service';

export interface CreatePurchaseInvoiceFromCfdiResultData {
  readonly docEntry: number;
  readonly docNum?: number;
  readonly potentialDiscountRisk: boolean;
  readonly docTotalDiff: number;
  readonly sapSessionCompanyId: number;
}

export type CreatePurchaseInvoiceFromCfdiResponse =
  ApiSuccessResponse<CreatePurchaseInvoiceFromCfdiResultData>;

type PrismaUserCompanyReader = {
  readonly user: {
    findUnique(args: {
      where: { id: number };
      select: { companyId: true };
    }): Promise<{ companyId: number } | null>;
  };
};

@Injectable()
export class CreatePurchaseInvoiceFromCfdiUseCase {
  private readonly logger = new Logger(
    CreatePurchaseInvoiceFromCfdiUseCase.name,
  );

  constructor(
    private readonly prisma: PrismaService,
    private readonly sapAuthAdapter: SapAuthAdapter,
    private readonly assembler: CfdiSapPurchaseInvoiceAssembler,
    @Inject('CompanySapCurrencyResolver')
    private readonly companySapCurrencyResolver: CompanySapCurrencyResolver,
    @Inject('SapPurchaseInvoiceWriter')
    private readonly sapPurchaseInvoiceWriter: SapPurchaseInvoiceWriter,
    @Inject('DmsStoragePort')
    private readonly dmsStoragePort: DmsStoragePort,
    @Inject('DMS_BUCKET_CONFIG')
    private readonly dmsBucketConfig: DmsBucketConfig,
  ) {}

  async execute(
    command: CreatePurchaseInvoiceFromCfdiCommand,
    userId: number,
  ): Promise<CreatePurchaseInvoiceFromCfdiResponse> {
    const prismaReader = this.prisma as unknown as PrismaUserCompanyReader;
    const user = await prismaReader.user.findUnique({
      where: { id: userId },
      select: { companyId: true },
    });
    if (user === null) {
      throw new NotFoundException('Usuario no encontrado.');
    }
    if (user.companyId !== command.companyId) {
      throw new ForbiddenException(
        'No puedes crear facturas SAP para otra compañía.',
      );
    }

    const tipo = command.xmlData.Comprobante.TipoDeComprobante.toLowerCase();
    if (tipo === 'vale' || tipo === 'ticket') {
      throw new BadRequestException(
        'No se permite procesar vales o tickets en este servicio.',
      );
    }

    const uuid = command.xmlData.Complemento?.TimbreFiscalDigital?.UUID;
    if (uuid === undefined || uuid.trim().length === 0) {
      throw new BadRequestException(
        'El XML debe incluir el UUID del TimbreFiscalDigital.',
      );
    }

    const sapSessionCompanyId =
      command.sapSessionCompanyId ?? command.companyId;

    const cuentaCategoria = await this.prisma.viaticCategory.findFirst({
      where: {
        companyId: sapSessionCompanyId,
        code: command.accountCode.trim(),
      },
      select: { id: true },
    });
    if (cuentaCategoria === null) {
      throw new BadRequestException({
        message: `La categoría contable no existe para la compañía de la tarjeta en SAP (companyId=${sapSessionCompanyId.toString()}).`,
        error: 'CUENTA_NO_VALIDA_COMPANY_TARJETA',
      });
    }

    const indicadorIva = await this.prisma.vAT.findFirst({
      where: {
        companyId: sapSessionCompanyId,
        code: command.taxCode.trim(),
      },
      select: { id: true },
    });
    if (indicadorIva === null) {
      throw new BadRequestException({
        message: `El indicador de IVA no existe para la compañía de la tarjeta en SAP (companyId=${sapSessionCompanyId.toString()}).`,
        error: 'IVA_NO_VALIDO_COMPANY_TARJETA',
      });
    }

    const xmlMoneda = command.xmlData.Comprobante.Moneda ?? 'MXN';
    const docCurrency =
      await this.companySapCurrencyResolver.resolveSapCurrencyCode(
        sapSessionCompanyId,
        xmlMoneda,
      );

    const payload = this.assembler.assemble(command, docCurrency);
    const cuadre = this.computeCuadre(payload);
    if (cuadre.potentialDiscountRisk) {
      this.logger.warn(
        `Posible descuadre pre-SAP (diff ${cuadre.docTotalDiff.toString()}). companyId negocio=${command.companyId.toString()} sapSessionCompanyId=${sapSessionCompanyId.toString()}`,
      );
    }
    if (sapSessionCompanyId !== command.companyId) {
      this.logger.log(
        `SAP: PurchaseInvoices con sesión companyId=${sapSessionCompanyId.toString()} (negocio/viaje companyId=${command.companyId.toString()}). Ver documento en esa CompanyDB.`,
      );
    }

    const login = await this.sapAuthAdapter.login(sapSessionCompanyId);
    const sessionId = login.SessionId;
    try {
      let created: SapCreatedPurchaseInvoiceRecord;
      try {
        created = await this.sapPurchaseInvoiceWriter.createPurchaseInvoice(
          sessionId,
          payload,
        );
      } catch (error: unknown) {
        const mensaje = error instanceof Error ? error.message : String(error);
        this.logger.error(
          `Fallo al crear PurchaseInvoices en SAP sapSessionCompanyId=${sapSessionCompanyId.toString()} companyId negocio=${command.companyId.toString()} sapCardCode=${command.sapCardCode} uuid=${uuid ?? 'n/a'} docTotal=${String(payload.DocTotal)} lineas=${String(payload.DocumentLines?.length ?? 0)}: ${mensaje}`,
          error instanceof Error ? error.stack : undefined,
        );
        throw error;
      }
      await this.tryPatchDocumentUrls(
        sessionId,
        created.DocEntry,
        command.sapDmsDocumentPaths,
      );
      return buildSuccessResponse(
        {
          docEntry: created.DocEntry,
          docNum: created.DocNum,
          potentialDiscountRisk: cuadre.potentialDiscountRisk,
          docTotalDiff: cuadre.docTotalDiff,
          sapSessionCompanyId,
        },
        'Factura de compra registrada en SAP.',
      );
    } finally {
      await this.sapAuthAdapter.logout(sessionId);
    }
  }

  private computeCuadre(payload: ServiceLayerPurchaseInvoicePayload): {
    readonly docTotalDiff: number;
    readonly potentialDiscountRisk: boolean;
  } {
    const round2 = (value: number): number => Math.round(value * 100) / 100;
    const lineTotals = (payload.DocumentLines ?? []).map((line) =>
      round2(Number(line.LineTotal ?? 0)),
    );
    const linesSubtotal = round2(
      lineTotals.reduce((sum, value) => sum + value, 0),
    );
    const vatSum = round2(Number(payload.VatSum ?? 0));
    const expectedDocTotal = round2(linesSubtotal + vatSum);
    const docTotal = round2(Number(payload.DocTotal ?? 0));
    const docTotalDiff = round2(docTotal - expectedDocTotal);
    const potentialDiscountRisk = Math.abs(docTotalDiff) > 0.05;
    return { docTotalDiff, potentialDiscountRisk };
  }

  private async tryPatchDocumentUrls(
    sessionId: string,
    docEntry: number,
    dmsPaths:
      | CreatePurchaseInvoiceFromCfdiCommand['sapDmsDocumentPaths']
      | undefined,
  ): Promise<void> {
    if (dmsPaths === undefined) {
      return;
    }

    const expiresIn = this.dmsBucketConfig.sapSignedUrlExpiresInSeconds;
    let xmlUrl: string | undefined;
    let pdfUrl: string | undefined;

    try {
      const xmlSigned = await this.dmsStoragePort.createSignedDownloadUrl(
        dmsPaths.xmlFilePath,
        expiresIn,
      );
      xmlUrl = xmlSigned.signedUrl;
    } catch (error: unknown) {
      const mensaje = error instanceof Error ? error.message : String(error);
      this.logger.error(
        `No se pudo firmar URL Supabase para U_XML (docEntry=${docEntry.toString()}): ${mensaje}`,
      );
    }

    const pdfPath = dmsPaths.pdfFilePath?.trim();
    if (pdfPath !== undefined && pdfPath.length > 0) {
      try {
        const pdfSigned = await this.dmsStoragePort.createSignedDownloadUrl(
          pdfPath,
          expiresIn,
        );
        pdfUrl = pdfSigned.signedUrl;
      } catch (error: unknown) {
        const mensaje = error instanceof Error ? error.message : String(error);
        this.logger.error(
          `No se pudo firmar URL Supabase para U_PDF (docEntry=${docEntry.toString()}): ${mensaje}`,
        );
      }
    }

    if (xmlUrl === undefined && pdfUrl === undefined) {
      return;
    }

    try {
      await this.sapPurchaseInvoiceWriter.patchDocumentUrls(sessionId, docEntry, {
        ...(xmlUrl !== undefined ? { xmlUrl } : {}),
        ...(pdfUrl !== undefined ? { pdfUrl } : {}),
      });
    } catch (error: unknown) {
      const mensaje = error instanceof Error ? error.message : String(error);
      this.logger.error(
        `No se pudieron actualizar U_XML/U_PDF en SAP (docEntry=${docEntry.toString()}): ${mensaje}`,
      );
    }
  }
}
