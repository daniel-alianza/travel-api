export interface SapCreatedPurchaseInvoiceRecord {
  readonly DocEntry: number;
  readonly DocNum?: number;
  readonly CardCode?: string;
  readonly DocTotal?: number;
  readonly DocDate?: string;
  readonly DocDueDate?: string;
}
