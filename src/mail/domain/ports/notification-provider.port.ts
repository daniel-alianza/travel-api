import type { TeamsNotificationMessage } from '../entities/email-message.entity';

export interface NotificationProviderPort {
  sendNotification(message: TeamsNotificationMessage): Promise<boolean>;
}
