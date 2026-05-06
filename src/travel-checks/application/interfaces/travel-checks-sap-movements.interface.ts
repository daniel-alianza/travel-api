export type ExpenseTripMovementContextRecord = {
  readonly tripId: number;
  readonly destination: string;
  readonly departureDate: Date;
  readonly returnDate: Date;
  readonly companyId: number;
  readonly corporateCardNumber: string | null;
  readonly accountCodes: readonly string[];
};

export type SapExpenseMovementRecord = {
  readonly sequence: number;
  readonly dueDate: string;
  readonly memo: string;
  readonly reference: string;
  readonly debitAmount: number;
};

export interface TravelChecksSapMovementsPort {
  fetchByReference(
    context: ExpenseTripMovementContextRecord,
  ): Promise<readonly SapExpenseMovementRecord[]>;
}
