import type { ApprovalRequestRecord } from '../interfaces/travel-request-repository.interface';
import { computeTravelTripViaticosDispersionTotal } from './travel-trip-amount.utils';

export function computeTravelRequestViaticosDispersionAmount(
  request: ApprovalRequestRecord,
): number {
  const approvedTrips = request.trips.filter(
    (trip) => trip.tripApprovalStatus === 'approved',
  );
  return computeTravelTripViaticosDispersionTotal(approvedTrips);
}
