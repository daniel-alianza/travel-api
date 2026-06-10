import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import type { MailerPort } from '../../application/interfaces/mailer.port';
import type { ApprovedSentNotificationCommand } from '../../application/use-cases/send-approved-sent-notification.use-case';
import type { BossAuthNotificationCommand } from '../../application/use-cases/send-boss-auth-notification.use-case';
import type { DispersionMessageNotificationCommand } from '../../application/use-cases/send-dispersion-message-notification.use-case';
import type { RequestApprovedNotificationCommand } from '../../application/use-cases/send-request-approved-notification.use-case';
import type { RequestSentNotificationCommand } from '../../application/use-cases/send-request-sent-notification.use-case';

@Injectable()
export class PowerAutomateMailerAdapter implements MailerPort {
  private readonly logger = new Logger(PowerAutomateMailerAdapter.name);
  private readonly webhookUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.webhookUrl = this.configService.getOrThrow<string>(
      'NOTIFICATIONS_FOR_POWERAUTOMATE',
    );
  }

  async notifyRequestSent(
    command: Record<string, unknown>,
    htmlContent: string,
  ): Promise<void> {
    const cmd = command as unknown as RequestSentNotificationCommand;

    const emailSubject = 'Solicitud de viáticos enviada correctamente';

    const payload = {
      status: 'request_sent',
      recipientEmail: cmd.recipientEmail,
      employeeEmail: cmd.recipientEmail,
      emailSubject,
      employeeName: cmd.employeeName,
      bossName: cmd.bossName,
      companyName: cmd.companyName,
      cardNumber: cmd.cardNumber,
      requestId: cmd.requestId,
      motivo: cmd.motivo,
      destinos: cmd.destinos,
      totalAmount: cmd.totalAmount,
      gasolinaAmount: cmd.gasolinaAmount,
      tagAmount: cmd.tagAmount,
      tripCount: cmd.tripCount,
      appUrl: cmd.appUrl,
      htmlContent,
    };

    this.logger.debug(
      `POST Power Automate request_sent solicitud #${cmd.requestId} → ${cmd.recipientEmail}`,
    );

    await firstValueFrom(this.httpService.post(this.webhookUrl, payload));

    this.logger.log(
      `Power Automate request_sent OK solicitud #${cmd.requestId} → ${cmd.recipientEmail}`,
    );
  }

  async notifyBossAuth(
    command: Record<string, unknown>,
    htmlContent: string,
  ): Promise<void> {
    const cmd = command as unknown as BossAuthNotificationCommand;

    const emailSubject = 'Solicitud de viáticos pendiente de autorización';

    const payload = {
      status: 'boss_authorization',
      recipientEmail: cmd.recipientEmail,
      bossEmail: cmd.recipientEmail,
      emailSubject,
      employeeName: cmd.employeeName,
      bossName: cmd.bossName,
      companyName: cmd.companyName,
      cardNumber: cmd.cardNumber,
      requestId: cmd.requestId,
      motivo: cmd.motivo,
      destinos: cmd.destinos,
      totalAmount: cmd.totalAmount,
      gasolinaAmount: cmd.gasolinaAmount,
      tagAmount: cmd.tagAmount,
      tripCount: cmd.tripCount,
      appUrl: cmd.appUrl,
      htmlContent,
    };

    this.logger.debug(
      `POST Power Automate boss_authorization solicitud #${cmd.requestId} → ${cmd.recipientEmail} | status=boss_authorization`,
    );
    this.logger.debug(
      `Payload boss_authorization: ${JSON.stringify({
        ...payload,
        htmlContent: `[${htmlContent.length} caracteres]`,
      })}`,
    );

    await firstValueFrom(this.httpService.post(this.webhookUrl, payload));

    this.logger.log(
      `Power Automate boss_authorization OK solicitud #${cmd.requestId} → ${cmd.recipientEmail}`,
    );
  }

  async notifyRequestApproved(
    command: Record<string, unknown>,
    htmlContent: string,
  ): Promise<void> {
    const cmd = command as unknown as RequestApprovedNotificationCommand;

    const emailSubject = 'Solicitud de viáticos aprobada';

    const payload = {
      status: 'request_approved',
      recipientEmail: cmd.recipientEmail,
      employeeEmail: cmd.recipientEmail,
      emailSubject,
      employeeName: cmd.employeeName,
      bossName: cmd.bossName,
      companyName: cmd.companyName,
      cardNumber: cmd.cardNumber,
      requestId: cmd.requestId,
      motivo: cmd.motivo,
      destinos: cmd.destinos,
      totalAmount: cmd.totalAmount,
      gasolinaAmount: cmd.gasolinaAmount,
      tagAmount: cmd.tagAmount,
      tripCount: cmd.tripCount,
      appUrl: cmd.appUrl,
      htmlContent,
    };

    this.logger.debug(
      `POST Power Automate request_approved solicitud #${cmd.requestId} → ${cmd.recipientEmail}`,
    );

    await firstValueFrom(this.httpService.post(this.webhookUrl, payload));

    this.logger.log(
      `Power Automate request_approved OK solicitud #${cmd.requestId} → ${cmd.recipientEmail}`,
    );
  }

  async notifyApprovedSent(
    command: Record<string, unknown>,
    htmlContent: string,
  ): Promise<void> {
    const cmd = command as unknown as ApprovedSentNotificationCommand;

    const emailSubject = 'Solicitud de viáticos autorizada con éxito';

    const payload = {
      status: 'approved_sent',
      recipientEmail: cmd.recipientEmail,
      bossEmail: cmd.recipientEmail,
      emailSubject,
      employeeName: cmd.employeeName,
      bossName: cmd.bossName,
      companyName: cmd.companyName,
      cardNumber: cmd.cardNumber,
      requestId: cmd.requestId,
      motivo: cmd.motivo,
      destinos: cmd.destinos,
      totalAmount: cmd.totalAmount,
      gasolinaAmount: cmd.gasolinaAmount,
      tagAmount: cmd.tagAmount,
      tripCount: cmd.tripCount,
      appUrl: cmd.appUrl,
      htmlContent,
    };

    this.logger.debug(
      `POST Power Automate approved_sent solicitud #${cmd.requestId} → ${cmd.recipientEmail}`,
    );

    await firstValueFrom(this.httpService.post(this.webhookUrl, payload));

    this.logger.log(
      `Power Automate approved_sent OK solicitud #${cmd.requestId} → ${cmd.recipientEmail}`,
    );
  }

  async notifyDispersionMessage(
    command: Record<string, unknown>,
    htmlContent: string,
  ): Promise<void> {
    const cmd = command as unknown as DispersionMessageNotificationCommand;

    const emailSubject = 'Nueva solicitud pendiente de dispersión';

    const payload = {
      status: 'dispersion_message',
      recipientEmail: cmd.recipientEmail,
      dispersorName: cmd.dispersorName,
      emailSubject,
      employeeName: cmd.employeeName,
      bossName: cmd.bossName,
      companyName: cmd.companyName,
      cardNumber: cmd.cardNumber,
      requestId: cmd.requestId,
      motivo: cmd.motivo,
      destinos: cmd.destinos,
      totalAmount: cmd.totalAmount,
      gasolinaAmount: cmd.gasolinaAmount,
      tagAmount: cmd.tagAmount,
      tripCount: cmd.tripCount,
      appUrl: cmd.appUrl,
      htmlContent,
    };

    this.logger.debug(
      `POST Power Automate dispersion_message solicitud #${cmd.requestId} → ${cmd.recipientEmail}`,
    );

    await firstValueFrom(this.httpService.post(this.webhookUrl, payload));

    this.logger.log(
      `Power Automate dispersion_message OK solicitud #${cmd.requestId} → ${cmd.recipientEmail}`,
    );
  }
}
