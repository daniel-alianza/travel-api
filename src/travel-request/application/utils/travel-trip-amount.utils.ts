export type TravelTripExpenseAmounts = {
  readonly transporte: number;
  readonly peajes: number;
  readonly hospedaje: number;
  readonly alimentos: number;
  readonly fletes: number;
  readonly herramientas: number;
  readonly envios: number;
  readonly miscelaneos: number;
};

export type TravelTripExpenseRecordAmounts = {
  readonly transport: number;
  readonly tolls: number;
  readonly lodging: number;
  readonly food: number;
  readonly freight: number;
  readonly tools: number;
  readonly shipping: number;
  readonly miscellaneous: number;
};

export function roundTripAmount(value: number): number {
  return Math.round(value * 100) / 100;
}

export function toSafeTripAmount(value: number | null | undefined): number {
  if (value === null || value === undefined) {
    return 0;
  }
  if (!Number.isFinite(value)) {
    return 0;
  }
  return value;
}

export function sumTravelTripExpenses(
  expenses: TravelTripExpenseAmounts,
): number {
  return roundTripAmount(
    toSafeTripAmount(expenses.transporte) +
      toSafeTripAmount(expenses.peajes) +
      toSafeTripAmount(expenses.hospedaje) +
      toSafeTripAmount(expenses.alimentos) +
      toSafeTripAmount(expenses.fletes) +
      toSafeTripAmount(expenses.herramientas) +
      toSafeTripAmount(expenses.envios) +
      toSafeTripAmount(expenses.miscelaneos),
  );
}

export function sumTravelTripExpenseRecord(
  expenses: TravelTripExpenseRecordAmounts | null,
): number {
  if (expenses === null) {
    return 0;
  }
  return roundTripAmount(
    toSafeTripAmount(expenses.transport) +
      toSafeTripAmount(expenses.tolls) +
      toSafeTripAmount(expenses.lodging) +
      toSafeTripAmount(expenses.food) +
      toSafeTripAmount(expenses.freight) +
      toSafeTripAmount(expenses.tools) +
      toSafeTripAmount(expenses.shipping) +
      toSafeTripAmount(expenses.miscellaneous),
  );
}

export function computeTravelTripEstimatedTotal(input: {
  readonly viaticosTotal: number;
  readonly gasolinaTotal: number;
  readonly tagTotal: number;
}): number {
  return roundTripAmount(
    input.viaticosTotal + input.gasolinaTotal + input.tagTotal,
  );
}

export function computeTravelTripViaticosDispersionTotal(
  trips: readonly { readonly expenses: TravelTripExpenseRecordAmounts | null }[],
): number {
  return roundTripAmount(
    trips.reduce(
      (total, trip) => total + sumTravelTripExpenseRecord(trip.expenses),
      0,
    ),
  );
}
