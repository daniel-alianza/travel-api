import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendApprovedSentNotificationUseCase } from '../../../notifications/application/use-cases/send-approved-sent-notification.use-case';
import { SendDispersionMessageNotificationUseCase } from '../../../notifications/application/use-cases/send-dispersion-message-notification.use-case';
import { SendRequestApprovedNotificationUseCase } from '../../../notifications/application/use-cases/send-request-approved-notification.use-case';
import { buildApprovedSentNotificationPayload } from '../../domain/build-approved-sent-notification-payload';
import { buildDispersionMessageNotificationPayload } from '../../domain/build-dispersion-message-notification-payload';
import { buildRequestApprovedNotificationPayload } from '../../domain/build-request-approved-notification-payload';
import { buildTravelRequestApprovalAppUrl } from '../../domain/build-travel-request-approval-app-url';
import { buildTravelRequestDispersionAppUrl } from '../../domain/build-travel-request-dispersion-app-url';
import type { TravelRequestRepository } from '../interfaces/travel-request-repository.interface';

type ApprovedNotificationContext = NonNullable<
  Awaited<
    ReturnType<
      TravelRequestRepository['findTravelRequestApprovedNotificationContext']
    >
  >
>;

@Injectable()
export class NotifyTravelRequestApprovedUseCase {
  private readonly logger = new Logger(NotifyTravelRequestApprovedUseCase.name);

  constructor(
    @Inject('TravelRequestRepository')
    private readonly travelRequestRepository: TravelRequestRepository,
    private readonly configService: ConfigService,
    private readonly sendRequestApprovedNotificationUseCase: SendRequestApprovedNotificationUseCase,
    private readonly sendApprovedSentNotificationUseCase: SendApprovedSentNotificationUseCase,
    private readonly sendDispersionMessageNotificationUseCase: SendDispersionMessageNotificationUseCase,
  ) {}

  async execute(requestId: number): Promise<void> {
    try {
      this.logger.debug(
        `Iniciando notificaciones de aprobación para solicitud #${requestId}`,
      );

      const context =
        await this.travelRequestRepository.findTravelRequestApprovedNotificationContext(
          requestId,
        );

      if (context === null) {
        this.logger.warn(
          `Notificaciones de aprobación omitidas: solicitud #${requestId} no encontrada o sin correo del empleado.`,
        );
        return;
      }

      if (context.status !== 'approved') {
        this.logger.debug(
          `Notificaciones de aprobación omitidas solicitud #${requestId}: status=${context.status}`,
        );
        return;
      }

      const frontendUrl = this.configService.get<string>('FRONTEND_URL') ?? '';
      const employeeAppUrl = frontendUrl;
      const approvalAppUrl = buildTravelRequestApprovalAppUrl(frontendUrl);
      const dispersionAppUrl = buildTravelRequestDispersionAppUrl(frontendUrl);

      await this.notifyEmployeeSafely(requestId, context, employeeAppUrl);
      await this.notifyBossSafely(requestId, context, approvalAppUrl);
      await this.notifyTreasurySafely(requestId, context, dispersionAppUrl);
    } catch (error) {
      this.logger.error(
        `Error inesperado en notificaciones de aprobación para solicitud #${requestId}`,
        error,
      );
    }
  }

  private async notifyEmployeeSafely(
    requestId: number,
    context: ApprovedNotificationContext,
    appUrl: string,
  ): Promise<void> {
    try {
      const payload = buildRequestApprovedNotificationPayload({
        requestId: context.requestId,
        employeeName: context.employeeName,
        corporateCardNumber: context.corporateCardNumber,
        employeeEmail: context.employeeEmail,
        bossName: context.bossName,
        companyName: context.companyName,
        trips: context.trips,
        appUrl,
      });

      this.logger.debug(
        `Enviando request_approved solicitud #${requestId} → ${payload.recipientEmail}`,
      );

      await this.sendRequestApprovedNotificationUseCase.execute(payload);

      this.logger.log(
        `Notificación request_approved enviada para solicitud #${requestId} → ${payload.recipientEmail}`,
      );
    } catch (error) {
      this.logger.error(
        `Falló request_approved para solicitud #${requestId}`,
        error,
      );
    }
  }

  private async notifyBossSafely(
    requestId: number,
    context: ApprovedNotificationContext,
    appUrl: string,
  ): Promise<void> {
    const bossEmail = context.bossEmail?.trim() ?? '';
    if (bossEmail.length === 0) {
      this.logger.warn(
        `Notificación approved_sent omitida solicitud #${requestId}: jefe "${context.bossName}" sin correo registrado.`,
      );
      return;
    }

    try {
      const payload = buildApprovedSentNotificationPayload({
        requestId: context.requestId,
        employeeName: context.employeeName,
        corporateCardNumber: context.corporateCardNumber,
        bossName: context.bossName,
        bossEmail,
        companyName: context.companyName,
        trips: context.trips,
        appUrl,
      });

      this.logger.debug(
        `Enviando approved_sent solicitud #${requestId} → ${payload.recipientEmail}`,
      );

      await this.sendApprovedSentNotificationUseCase.execute(payload);

      this.logger.log(
        `Notificación approved_sent enviada para solicitud #${requestId} → ${payload.recipientEmail}`,
      );
    } catch (error) {
      this.logger.error(
        `Falló approved_sent para solicitud #${requestId}`,
        error,
      );
    }
  }

  private async notifyTreasurySafely(
    requestId: number,
    context: ApprovedNotificationContext,
    appUrl: string,
  ): Promise<void> {
    try {
      const treasuryRecipients =
        await this.travelRequestRepository.findTreasuryDispersionNotificationRecipients(
          context.companyId,
        );

      if (treasuryRecipients.length === 0) {
        this.logger.warn(
          `Notificación dispersion_message omitida solicitud #${requestId}: sin usuarios activos en Tesorería con permiso viaticos.dispersar (companyId=${context.companyId}).`,
        );
        return;
      }

      for (const treasuryRecipient of treasuryRecipients) {
        try {
          const payload = buildDispersionMessageNotificationPayload({
            requestId: context.requestId,
            employeeName: context.employeeName,
            corporateCardNumber: context.corporateCardNumber,
            bossName: context.bossName,
            recipientEmail: treasuryRecipient.email,
            dispersorName: treasuryRecipient.dispersorName,
            companyName: context.companyName,
            trips: context.trips,
            appUrl,
          });

          this.logger.debug(
            `Enviando dispersion_message solicitud #${requestId} → ${payload.recipientEmail} (${payload.dispersorName})`,
          );

          await this.sendDispersionMessageNotificationUseCase.execute(payload);

          this.logger.log(
            `Notificación dispersion_message enviada para solicitud #${requestId} → ${payload.recipientEmail}`,
          );
        } catch (error) {
          this.logger.error(
            `Falló dispersion_message solicitud #${requestId} → ${treasuryRecipient.email}`,
            error,
          );
        }
      }
    } catch (error) {
      this.logger.error(
        `Falló dispersion_message para solicitud #${requestId}`,
        error,
      );
    }
  }
}
