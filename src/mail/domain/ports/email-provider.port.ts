import type { EmailMessage } from '../entities/email-message.entity';

export interface EmailProviderPort {
  sendEmail(message: EmailMessage): Promise<boolean>;
}

