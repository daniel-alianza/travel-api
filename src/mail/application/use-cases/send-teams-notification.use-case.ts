import { Inject, Injectable, Logger } from '@nestjs/common';
import type { NotificationProviderPort } from '../../domain/ports/notification-provider.port';
import { TeamsNotificationMessage } from '../../domain/entities/email-message.entity';

@Injectable()
export class SendTeamsNotificationUseCase {
  private readonly logger = new Logger(SendTeamsNotificationUseCase.name);

  constructor(
    @Inject('NotificationProviderPort')
    private readonly notificationProvider: NotificationProviderPort,
  ) {}

  async execute(message: TeamsNotificationMessage): Promise<boolean> {
    try {
      this.logger.log(
        `Iniciando envío de notificación Teams - Tipo: ${message.type} - RequestId: ${message.requestId} - Usuario: ${message.userName}`,
      );

      const result = await this.notificationProvider.sendNotification(message);

      if (result) {
        this.logger.log(
          `✅ Notificación Teams enviada exitosamente - Tipo: ${message.type} - RequestId: ${message.requestId} - Usuario: ${message.userName}`,
        );
      } else {
        this.logger.warn(
          `⚠️ Fallo el envío de notificación Teams - Tipo: ${message.type} - RequestId: ${message.requestId}`,
        );
      }

      return result;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      this.logger.error(
        `❌ Error al enviar notificación Teams - Tipo: ${message.type} - RequestId: ${message.requestId} - Usuario: ${message.userName} - Error: ${errorMessage}`,
      );
      return false;
    }
  }
}

