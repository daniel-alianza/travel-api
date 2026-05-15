import type { ServiceLayerPurchaseInvoicePayload } from './service-layer-purchase-invoice.interface';
import type { SapCreatedPurchaseInvoiceRecord } from './sap-created-purchase-invoice.interface';

export interface SapPurchaseInvoiceWriter {
  createPurchaseInvoice(
    sessionId: string,
    payload: ServiceLayerPurchaseInvoicePayload,
  ): Promise<SapCreatedPurchaseInvoiceRecord>;

  patchDocumentUrls(
    sessionId: string,
    docEntry: number,
    xmlUrl: string,
    pdfUrl: string,
  ): Promise<void>;
}
