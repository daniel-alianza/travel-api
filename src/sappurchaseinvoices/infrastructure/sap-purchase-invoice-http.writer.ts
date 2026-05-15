import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SapHttpService } from '../../infrastructure/SL/sap-http.service';
import type { SapCreatedPurchaseInvoiceRecord } from '../application/interfaces/sap-created-purchase-invoice.interface';
import type { ServiceLayerPurchaseInvoicePayload } from '../application/interfaces/service-layer-purchase-invoice.interface';
import type { SapPurchaseInvoiceWriter } from '../application/interfaces/sap-purchase-invoice-writer.interface';
import { omitEmptySapFields } from './sap-purchase-invoice-payload.util';

type SapHttpPostClient = {
  post<T>(url: string, data: unknown, sessionId?: string): Promise<T>;
};

type SapHttpPatchClient = {
  patch<T>(url: string, data: unknown, sessionId: string): Promise<T>;
};

type SapPostPurchaseInvoiceResponse = {
  readonly DocEntry?: number;
  readonly DocNum?: number;
  readonly CardCode?: string;
  readonly DocTotal?: number;
  readonly DocDate?: string;
  readonly DocDueDate?: string;
};

@Injectable()
export class SapPurchaseInvoiceHttpWriter implements SapPurchaseInvoiceWriter {
  constructor(
    private readonly configService: ConfigService,
    private readonly sapHttpService: SapHttpService,
  ) {}

  async createPurchaseInvoice(
    sessionId: string,
    payload: ServiceLayerPurchaseInvoicePayload,
  ): Promise<SapCreatedPurchaseInvoiceRecord> {
    const baseUrl = this.requireBaseUrl();
    const httpPost = this.sapHttpService as SapHttpPostClient;
    const response = await httpPost.post<SapPostPurchaseInvoiceResponse>(
      `${baseUrl}/PurchaseInvoices`,
      omitEmptySapFields(payload),
      sessionId,
    );
    const docEntry = response.DocEntry;
    if (typeof docEntry !== 'number') {
      throw new HttpException(
        'SAP no devolvió DocEntry al crear la factura de compra.',
        HttpStatus.BAD_GATEWAY,
      );
    }
    return {
      DocEntry: docEntry,
      DocNum: response.DocNum,
      CardCode: response.CardCode,
      DocTotal: response.DocTotal,
      DocDate: response.DocDate,
      DocDueDate: response.DocDueDate,
    };
  }

  async patchDocumentUrls(
    sessionId: string,
    docEntry: number,
    xmlUrl: string,
    pdfUrl: string,
  ): Promise<void> {
    const baseUrl = this.requireBaseUrl();
    const httpPatch = this.sapHttpService as SapHttpPatchClient;
    await httpPatch.patch(
      `${baseUrl}/PurchaseInvoices(${docEntry.toString()})`,
      {
        U_XML: xmlUrl,
        U_PDF: pdfUrl,
      },
      sessionId,
    );
  }

  private requireBaseUrl(): string {
    const baseUrl = this.configService.get<string>('SAP_SL_URL');
    if (!baseUrl) {
      throw new HttpException(
        'SAP_SL_URL no está configurada en el archivo .env',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  }
}
