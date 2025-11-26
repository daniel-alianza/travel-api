import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import type { EmailProviderPort } from '../../../domain/ports/email-provider.port';
import { EmailMessage } from '../../../domain/entities/email-message.entity';

@Injectable()
export class PowerAutomateEmailAdapter implements EmailProviderPort {
  private readonly logger = new Logger(PowerAutomateEmailAdapter.name);
  private readonly powerAutomateUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.powerAutomateUrl =
      this.configService.get<string>('Power_Automate_Url') || '';

    if (!this.powerAutomateUrl) {
      this.logger.warn(
        'Power_Automate_Url no está configurada en las variables de entorno',
      );
    }
  }

  async sendEmail(message: EmailMessage): Promise<boolean> {
    try {
      this.logger.debug(`Enviando email a través de Power Automate`);

      const payload = {
        from: message.from || 'viaticos@grupo-fg.com',
        to: message.getRecipientsAsString(),
        subject: message.subject,
        body: message.html,
      };

      await axios.post(this.powerAutomateUrl, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return true;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      this.logger.error(`Error al enviar email: ${errorMessage}`);
      return false;
    }
  }
}
