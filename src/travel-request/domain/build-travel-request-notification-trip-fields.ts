import { roundToTwoDecimals } from './travel-request-food-policy';
import type { TravelRequestTripInput } from '../application/interfaces/travel-request-repository.interface';

export type TravelRequestNotificationTripFields = {
  readonly motivo: string;
  readonly destinos: string;
  readonly totalAmount: number;
  readonly gasolinaAmount: number;
  readonly tagAmount: number;
  readonly tripCount: number;
};

export function buildTravelRequestNotificationTripFields(
  trips: readonly TravelRequestTripInput[],
): TravelRequestNotificationTripFields {
  const motivo = trips[0]?.motivoViaje ?? '';
  const destinos = trips.map((trip) => trip.destinoViaje).join(', ');

  return {
    motivo,
    destinos,
    totalAmount: roundToTwoDecimals(
      trips.reduce((sum, trip) => sum + trip.totalEstimado, 0),
    ),
    gasolinaAmount: roundToTwoDecimals(
      trips.reduce(
        (sum, trip) =>
          sum +
          (trip.gasolina.necesitaGasolina
            ? toSafeNumber(trip.gasolina.montoSolicitado)
            : 0),
        0,
      ),
    ),
    tagAmount: roundToTwoDecimals(
      trips.reduce(
        (sum, trip) =>
          sum +
          (trip.tag.necesitaTag ? toSafeNumber(trip.tag.montoSolicitado) : 0),
        0,
      ),
    ),
    tripCount: trips.length,
  };
}

function toSafeNumber(value: number | null | undefined): number {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return 0;
  }
  return value;
}
