import type { ApprovedSentNotificationCommand } from '../../notifications/application/use-cases/send-approved-sent-notification.use-case';
import type { TravelRequestTripInput } from '../application/interfaces/travel-request-repository.interface';
import { buildTravelRequestNotificationTripFields } from './build-travel-request-notification-trip-fields';

export function buildApprovedSentNotificationPayload(input: {
  readonly requestId: number;
  readonly employeeName: string;
  readonly corporateCardNumber: string | null;
  readonly bossName: string;
  readonly bossEmail: string;
  readonly companyName: string;
  readonly trips: readonly TravelRequestTripInput[];
  readonly appUrl: string;
}): ApprovedSentNotificationCommand {
  const tripFields = buildTravelRequestNotificationTripFields(input.trips);

  return {
    recipientEmail: input.bossEmail.trim(),
    employeeName: input.employeeName.trim(),
    bossName: input.bossName,
    companyName: input.companyName,
    cardNumber: input.corporateCardNumber?.trim() ?? '',
    requestId: String(input.requestId),
    appUrl: input.appUrl,
    ...tripFields,
  };
}
