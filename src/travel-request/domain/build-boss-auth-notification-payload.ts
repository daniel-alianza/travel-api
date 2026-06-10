import type { BossAuthNotificationCommand } from '../../notifications/application/use-cases/send-boss-auth-notification.use-case';
import type {
  TravelRequestNotificationContactsRecord,
  TravelRequestTripInput,
} from '../application/interfaces/travel-request-repository.interface';
import { buildTravelRequestNotificationTripFields } from './build-travel-request-notification-trip-fields';

export function buildBossAuthNotificationPayload(input: {
  readonly requestId: number;
  readonly employeeName: string;
  readonly corporateCardNumber: string | null;
  readonly trips: readonly TravelRequestTripInput[];
  readonly contacts: TravelRequestNotificationContactsRecord;
  readonly appUrl: string;
}): BossAuthNotificationCommand | null {
  const bossEmail = input.contacts.bossEmail?.trim() ?? '';
  if (bossEmail.length === 0) {
    return null;
  }

  const tripFields = buildTravelRequestNotificationTripFields(input.trips);

  return {
    recipientEmail: bossEmail,
    employeeName: input.employeeName.trim(),
    bossName: input.contacts.bossName,
    companyName: input.contacts.companyName,
    cardNumber: input.corporateCardNumber?.trim() ?? '',
    requestId: String(input.requestId),
    appUrl: input.appUrl,
    ...tripFields,
  };
}
