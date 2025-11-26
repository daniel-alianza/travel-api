import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import type { NotificationProviderPort } from '../../../domain/ports/notification-provider.port';
import { TeamsNotificationMessage } from '../../../domain/entities/email-message.entity';

@Injectable()
export class TeamsNotificationAdapter implements NotificationProviderPort {
  private readonly logger = new Logger(TeamsNotificationAdapter.name);
  private readonly powerAutomateTeamsUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.powerAutomateTeamsUrl =
      this.configService.get<string>('Power_Automate_Url_Teams') || '';

    if (!this.powerAutomateTeamsUrl) {
      this.logger.warn(
        'Power_Automate_Url_Teams no está configurada en las variables de entorno',
      );
    }
  }

  async sendNotification(message: TeamsNotificationMessage): Promise<boolean> {
    try {
      this.logger.debug(`Enviando notificación Teams - Tipo: ${message.type}`);

      await axios.post(this.powerAutomateTeamsUrl, message.toPlainObject(), {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return true;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      this.logger.error(`Error al enviar notificación Teams: ${errorMessage}`);
      return false;
    }
  }
}
