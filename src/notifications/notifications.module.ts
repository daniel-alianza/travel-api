import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SendApprovedSentNotificationUseCase } from './application/use-cases/send-approved-sent-notification.use-case';
import { SendBossAuthNotificationUseCase } from './application/use-cases/send-boss-auth-notification.use-case';
import { SendDispersionApplicantForBossNotificationUseCase } from './application/use-cases/send-dispersion-applicant-for-boss-notification.use-case';
import { SendDispersionApplicantNotificationUseCase } from './application/use-cases/send-dispersion-applicant-notification.use-case';
import { SendDispersionMessageNotificationUseCase } from './application/use-cases/send-dispersion-message-notification.use-case';
import { SendRequestApprovedNotificationUseCase } from './application/use-cases/send-request-approved-notification.use-case';
import { SendRequestSentNotificationUseCase } from './application/use-cases/send-request-sent-notification.use-case';
import { HandlebarsRenderService } from './infrastructure/mail/handlebars-render.service';
import { PowerAutomateMailerAdapter } from './infrastructure/mail/smtp-mailer.adapter';
import { NotificactionController } from './presentation/notificaction.controller';

@Module({
  imports: [HttpModule],
  controllers: [NotificactionController],
  providers: [
    SendRequestSentNotificationUseCase,
    SendBossAuthNotificationUseCase,
    SendRequestApprovedNotificationUseCase,
    SendApprovedSentNotificationUseCase,
    SendDispersionMessageNotificationUseCase,
    SendDispersionApplicantNotificationUseCase,
    SendDispersionApplicantForBossNotificationUseCase,
    HandlebarsRenderService,
    PowerAutomateMailerAdapter,
    {
      provide: 'MailerPort',
      useExisting: PowerAutomateMailerAdapter,
    },
    {
      provide: 'TemplateRendererPort',
      useExisting: HandlebarsRenderService,
    },
  ],
  exports: [
    SendRequestSentNotificationUseCase,
    SendBossAuthNotificationUseCase,
    SendRequestApprovedNotificationUseCase,
    SendApprovedSentNotificationUseCase,
    SendDispersionMessageNotificationUseCase,
    SendDispersionApplicantNotificationUseCase,
    SendDispersionApplicantForBossNotificationUseCase,
    'MailerPort',
    'TemplateRendererPort',
  ],
})
export class NotificationsModule {}
