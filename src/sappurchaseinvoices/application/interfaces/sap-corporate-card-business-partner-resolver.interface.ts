export const SAP_CORPORATE_CARD_BP_RESOLVER = 'SapCorporateCardBusinessPartnerResolver';

export type SapCorporateCardResolveResult = {
  readonly cardCode: string;
  readonly sapSessionCompanyId: number;
};

export interface SapCorporateCardBusinessPartnerResolver {
  resolvePurchaseInvoiceCardCode(input: {
    readonly companyId: number;
    readonly corporateCardNumber: string;
    readonly movementMemo: string | null;
  }): Promise<SapCorporateCardResolveResult>;
}
