export interface CompanySapCurrencyResolver {
  resolveSapCurrencyCode(
    companyId: number,
    sourceCurrencyCode: string,
  ): Promise<string>;
}
