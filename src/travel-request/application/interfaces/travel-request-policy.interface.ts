export type PolicyNotice = {
  readonly id: string;
  readonly text: string;
  readonly color: 'red';
  readonly buttonLabel: string | null;
  readonly actionUrl: string | null;
};

export type TripPolicyBreakdown = {
  readonly tripOrder: number;
  readonly totalEstimado: number;
  readonly gastosTotal: number;
  readonly gasolinaTotal: number;
  readonly tagTotal: number;
  readonly policyNotices: readonly PolicyNotice[];
  readonly foodPolicy: {
    readonly applies: boolean;
    readonly eventCost: number;
    readonly eventsPerDay: number;
    readonly ivaRate: number;
    readonly tipRate: number;
    readonly recommendedTotal: number;
  };
  readonly carRentPolicy: {
    readonly recommendedPerDay: number;
    readonly recommendedTotal: number;
  };
};
