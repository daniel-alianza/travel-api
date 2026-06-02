export type DisburseGasolineInvoiceInput = {
  readonly companyId: number;
  readonly supplierCode: string;
  readonly amount: number;
  readonly comments: string;
  readonly solicitudRef: string;
  readonly taxCode: string;
  readonly accountCode: string;
  readonly costingCode: string | null;
  readonly approverEmail: string | null;
  readonly approverName: string | null;
  readonly downPaymentDocEntry: number;
};

export type DisburseGasolineInvoiceResult = {
  readonly docEntry: number;
  readonly docNum: number;
};

export type GasolineAnticipoRecord = {
  readonly docEntry: number;
  readonly facturaDisponible: number;
  readonly total: number;
  readonly saldo: number;
};

export interface GasolineDisbursementPort {
  createPurchaseInvoice(
    input: DisburseGasolineInvoiceInput,
  ): Promise<DisburseGasolineInvoiceResult>;
  listAnticipos(
    companyId: number,
    supplierCode: string,
    companyName: string,
  ): Promise<readonly GasolineAnticipoRecord[]>;
}
