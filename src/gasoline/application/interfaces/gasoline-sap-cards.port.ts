export type GasolineSapCardRecord = {
  readonly sapCode: string;
  readonly name: string;
  readonly cardNumber: string;
  readonly branchCode: string | null;
  readonly isActiveInSap: boolean;
};

export type SearchGasolineSapCardsInput = {
  readonly companyId: number;
  readonly branchExternalCode: string | null;
  readonly filterByBranch: boolean;
  readonly searchText: string | null;
  readonly maxResults: number;
};

export interface GasolineSapCardsPort {
  search(
    input: SearchGasolineSapCardsInput,
  ): Promise<readonly GasolineSapCardRecord[]>;
  findBySapCode(
    companyId: number,
    sapCode: string,
  ): Promise<GasolineSapCardRecord | null>;
}
