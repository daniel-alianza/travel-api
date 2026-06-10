import type { RequestSentNotificationCommand } from '../../notifications/application/use-cases/send-request-sent-notification.use-case';
import type {
  TravelRequestNotificationContactsRecord,
  TravelRequestTripInput,
} from '../application/interfaces/travel-request-repository.interface';
import { buildTravelRequestNotificationTripFields } from './build-travel-request-notification-trip-fields';

export function buildRequestSentNotificationPayload(input: {
  readonly requestId: number;
  readonly employeeName: string;
  readonly corporateCardNumber: string | null;
  readonly trips: readonly TravelRequestTripInput[];
  readonly contacts: TravelRequestNotificationContactsRecord;
  readonly appUrl: string;
}): RequestSentNotificationCommand {
  const tripFields = buildTravelRequestNotificationTripFields(input.trips);

  return {
    recipientEmail: input.contacts.employeeEmail,
    employeeName: input.employeeName.trim(),
    bossName: input.contacts.bossName,
    companyName: input.contacts.companyName,
    cardNumber: input.corporateCardNumber?.trim() ?? '',
    requestId: String(input.requestId),
    appUrl: input.appUrl,
    ...tripFields,
  };
}
