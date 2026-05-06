export type DispersedTripForCheckRecord = {
  readonly id: number;
  readonly tripOrder: number;
  readonly destination: string;
  readonly tripApprovalStatus: string;
  readonly departureDate: Date;
  readonly returnDate: Date;
  readonly disbursementDate: Date;
  readonly estimatedTotal: number;
};

export type DispersedTravelRequestForCheckRecord = {
  readonly id: number;
  readonly status: string;
  readonly employeeName: string;
  readonly corporateCardNumber: string | null;
  readonly dispersedAt: Date | null;
  readonly dispersedTotal: number | null;
  readonly userId: number;
  readonly user: {
    readonly id: number;
    readonly name: string;
    readonly email: string;
  };
  readonly company: { readonly id: number; readonly name: string };
  readonly branch: { readonly id: number; readonly name: string };
  readonly area: { readonly id: number; readonly name: string };
  readonly trips: readonly DispersedTripForCheckRecord[];
};

export type ExpenseTripExpenseAmountsRecord = {
  readonly transport: number;
  readonly tolls: number;
  readonly lodging: number;
  readonly food: number;
  readonly freight: number;
  readonly tools: number;
  readonly shipping: number;
  readonly miscellaneous: number;
};

export type DispersedExpenseTripListRecord = {
  readonly id: number;
  readonly tripOrder: number;
  readonly destination: string;
  readonly purpose: string;
  readonly departureDate: Date;
  readonly returnDate: Date;
  readonly disbursementDate: Date;
  readonly estimatedTotal: number;
  readonly approvedAt: Date | null;
  readonly travelRequest: {
    readonly id: number;
    readonly corporateCardNumber: string | null;
    readonly dispersedAt: Date | null;
    readonly approvedAt: Date | null;
    readonly employeeName: string;
    readonly user: { readonly email: string };
    readonly company: { readonly name: string };
  };
  readonly expenses: ExpenseTripExpenseAmountsRecord | null;
};

export type DispersedExpenseTripMovementsSourceRecord = {
  readonly id: number;
  readonly destination: string;
  readonly disbursementDate: Date;
  readonly travelRequest: {
    readonly corporateCardNumber: string | null;
  };
  readonly expenses: ExpenseTripExpenseAmountsRecord | null;
};

export type ExpenseTripMovementContextRecord = {
  readonly tripId: number;
  readonly destination: string;
  readonly departureDate: Date;
  readonly returnDate: Date;
  readonly companyId: number;
  readonly corporateCardNumber: string | null;
  readonly accountCodes: readonly string[];
};

export interface TravelChecksRepository {
  findDispersedTravelRequestsWithDispersedTrips(): Promise<
    readonly DispersedTravelRequestForCheckRecord[]
  >;
  findDispersedExpenseTripsForUser(
    userId: number,
  ): Promise<readonly DispersedExpenseTripListRecord[]>;
  findDispersedExpenseTripMovementsSource(
    tripId: number,
    userId: number,
  ): Promise<DispersedExpenseTripMovementsSourceRecord | null>;
  findExpenseTripMovementContext(
    tripId: number,
    userId: number,
  ): Promise<ExpenseTripMovementContextRecord | null>;
}
