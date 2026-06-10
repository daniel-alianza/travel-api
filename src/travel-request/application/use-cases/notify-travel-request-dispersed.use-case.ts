import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendDispersionApplicantForBossNotificationUseCase } from '../../../notifications/application/use-cases/send-dispersion-applicant-for-boss-notification.use-case';
import { SendDispersionApplicantNotificationUseCase } from '../../../notifications/application/use-cases/send-dispersion-applicant-notification.use-case';
import { buildDispersionApplicantForBossNotificationPayload } from '../../domain/build-dispersion-applicant-for-boss-notification-payload';
import { buildDispersionApplicantNotificationPayload } from '../../domain/build-dispersion-applicant-notification-payload';
import { buildTravelRequestApprovalAppUrl } from '../../domain/build-travel-request-approval-app-url';
import type { TravelRequestRepository } from '../interfaces/travel-request-repository.interface';

type DispersedNotificationContext = NonNullable<
  Awaited<
    ReturnType<
      TravelRequestRepository['findTravelRequestDispersedNotificationContext']
    >
  >
>;

@Injectable()
export class NotifyTravelRequestDispersedUseCase {
  private readonly logger = new Logger(NotifyTravelRequestDispersedUseCase.name);

  constructor(
    @Inject('TravelRequestRepository')
    private readonly travelRequestRepository: TravelRequestRepository,
    private readonly configService: ConfigService,
    private readonly sendDispersionApplicantNotificationUseCase: SendDispersionApplicantNotificationUseCase,
    private readonly sendDispersionApplicantForBossNotificationUseCase: SendDispersionApplicantForBossNotificationUseCase,
  ) {}

  async execute(requestId: number): Promise<void> {
    try {
      this.logger.debug(
        `Iniciando notificaciones de dispersión para solicitud #${requestId}`,
      );

      const context =
        await this.travelRequestRepository.findTravelRequestDispersedNotificationContext(
          requestId,
        );

      if (context === null) {
        this.logger.warn(
          `Notificaciones de dispersión omitidas: solicitud #${requestId} no encontrada o sin datos válidos.`,
        );
        return;
      }

      if (context.status !== 'dispersed') {
        this.logger.debug(
          `Notificaciones de dispersión omitidas solicitud #${requestId}: status=${context.status}`,
        );
        return;
      }

      const frontendUrl = this.configService.get<string>('FRONTEND_URL') ?? '';
      const employeeAppUrl = frontendUrl;
      const approvalAppUrl = buildTravelRequestApprovalAppUrl(frontendUrl);

      await this.notifyApplicantSafely(requestId, context, employeeAppUrl);
      await this.notifyBossSafely(requestId, context, approvalAppUrl);
    } catch (error) {
      this.logger.error(
        `Error inesperado en notificaciones de dispersión para solicitud #${requestId}`,
        error,
      );
    }
  }

  private async notifyApplicantSafely(
    requestId: number,
    context: DispersedNotificationContext,
    appUrl: string,
  ): Promise<void> {
    try {
      const payload = buildDispersionApplicantNotificationPayload({
        requestId: context.requestId,
        employeeName: context.employeeName,
        corporateCardNumber: context.corporateCardNumber,
        employeeEmail: context.employeeEmail,
        bossName: context.bossName,
        dispersorName: context.dispersorName,
        companyName: context.companyName,
        dispersedTotal: context.dispersedTotal,
        trips: context.trips,
        appUrl,
      });

      this.logger.debug(
        `Enviando dispertion_applicant solicitud #${requestId} → ${payload.recipientEmail}`,
      );

      await this.sendDispersionApplicantNotificationUseCase.execute(payload);

      this.logger.log(
        `Notificación dispertion_applicant enviada para solicitud #${requestId} → ${payload.recipientEmail}`,
      );
    } catch (error) {
      this.logger.error(
        `Falló dispertion_applicant para solicitud #${requestId}`,
        error,
      );
    }
  }

  private async notifyBossSafely(
    requestId: number,
    context: DispersedNotificationContext,
    appUrl: string,
  ): Promise<void> {
    const bossEmail = context.bossEmail?.trim() ?? '';
    if (bossEmail.length === 0) {
      this.logger.warn(
        `Notificación dispertion_applicant_for_boss omitida solicitud #${requestId}: jefe "${context.bossName}" sin correo registrado.`,
      );
      return;
    }

    try {
      const payload = buildDispersionApplicantForBossNotificationPayload({
        requestId: context.requestId,
        employeeName: context.employeeName,
        corporateCardNumber: context.corporateCardNumber,
        bossName: context.bossName,
        bossEmail,
        dispersorName: context.dispersorName,
        companyName: context.companyName,
        dispersedTotal: context.dispersedTotal,
        trips: context.trips,
        appUrl,
      });

      this.logger.debug(
        `Enviando dispertion_applicant_for_boss solicitud #${requestId} → ${payload.recipientEmail}`,
      );

      await this.sendDispersionApplicantForBossNotificationUseCase.execute(
        payload,
      );

      this.logger.log(
        `Notificación dispertion_applicant_for_boss enviada para solicitud #${requestId} → ${payload.recipientEmail}`,
      );
    } catch (error) {
      this.logger.error(
        `Falló dispertion_applicant_for_boss para solicitud #${requestId}`,
        error,
      );
    }
  }
}
