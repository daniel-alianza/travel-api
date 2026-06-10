import type { RequestApprovedNotificationCommand } from '../../notifications/application/use-cases/send-request-approved-notification.use-case';
import type { TravelRequestTripInput } from '../application/interfaces/travel-request-repository.interface';
import { buildTravelRequestNotificationTripFields } from './build-travel-request-notification-trip-fields';

export function buildRequestApprovedNotificationPayload(input: {
  readonly requestId: number;
  readonly employeeName: string;
  readonly corporateCardNumber: string | null;
  readonly employeeEmail: string;
  readonly bossName: string;
  readonly companyName: string;
  readonly trips: readonly TravelRequestTripInput[];
  readonly appUrl: string;
}): RequestApprovedNotificationCommand {
  const tripFields = buildTravelRequestNotificationTripFields(input.trips);

  return {
    recipientEmail: input.employeeEmail.trim(),
    employeeName: input.employeeName.trim(),
    bossName: input.bossName,
    companyName: input.companyName,
    cardNumber: input.corporateCardNumber?.trim() ?? '',
    requestId: String(input.requestId),
    appUrl: input.appUrl,
    ...tripFields,
  };
}
