import type { DispersionApplicantNotificationCommand } from '../../notifications/application/use-cases/send-dispersion-applicant-notification.use-case';
import type { TravelRequestTripInput } from '../application/interfaces/travel-request-repository.interface';
import { buildTravelRequestNotificationTripFields } from './build-travel-request-notification-trip-fields';

export function buildDispersionApplicantNotificationPayload(input: {
  readonly requestId: number;
  readonly employeeName: string;
  readonly corporateCardNumber: string | null;
  readonly employeeEmail: string;
  readonly bossName: string;
  readonly dispersorName: string;
  readonly companyName: string;
  readonly dispersedTotal: number;
  readonly trips: readonly TravelRequestTripInput[];
  readonly appUrl: string;
}): DispersionApplicantNotificationCommand {
  const tripFields = buildTravelRequestNotificationTripFields(input.trips);

  return {
    recipientEmail: input.employeeEmail.trim(),
    dispersorName: input.dispersorName.trim(),
    employeeName: input.employeeName.trim(),
    bossName: input.bossName,
    companyName: input.companyName,
    cardNumber: input.corporateCardNumber?.trim() ?? '',
    requestId: String(input.requestId),
    appUrl: input.appUrl,
    totalAmount: input.dispersedTotal,
    motivo: tripFields.motivo,
    destinos: tripFields.destinos,
    gasolinaAmount: tripFields.gasolinaAmount,
    tagAmount: tripFields.tagAmount,
    tripCount: tripFields.tripCount,
  };
}
