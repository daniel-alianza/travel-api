import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PowerAutomateEmailAdapter } from './infraestructure/adapters/email/power-automate-email.adapter';
import { HandlebarsTemplateRendererAdapter } from './infraestructure/adapters/templates/handlebars-template-renderer.adapter';
import { TeamsNotificationAdapter } from './infraestructure/adapters/notifications/teams-notification.adapter';
import { SendEmailUseCase } from './application/use-cases/send-email.use-case';
import { SendTeamsNotificationUseCase } from './application/use-cases/send-teams-notification.use-case';
import { SendExpenseRequestTeamsNotificationUseCase } from './application/use-cases/send-expense-request-teams-notification.use-case';
import { SendApprovalTeamsNotificationUseCase } from './application/use-cases/send-approval-teams-notification.use-case';
import { SendRejectionTeamsNotificationUseCase } from './application/use-cases/send-rejection-teams-notification.use-case';
import { SendDispersalTeamsNotificationUseCase } from './application/use-cases/send-dispersal-teams-notification.use-case';
import { SendTreasurerTeamsNotificationUseCase } from './application/use-cases/send-treasurer-teams-notification.use-case';
import { SendSentTeamsNotificationUseCase } from './application/use-cases/send-sent-teams-notification.use-case';

@Module({
  imports: [ConfigModule],
  providers: [
    // Adapters
    PowerAutomateEmailAdapter,
    HandlebarsTemplateRendererAdapter,
    TeamsNotificationAdapter,
    // Use Cases
    SendEmailUseCase,
    SendTeamsNotificationUseCase,
    SendExpenseRequestTeamsNotificationUseCase,
    SendApprovalTeamsNotificationUseCase,
    SendRejectionTeamsNotificationUseCase,
    SendDispersalTeamsNotificationUseCase,
    SendTreasurerTeamsNotificationUseCase,
    SendSentTeamsNotificationUseCase,
    // Ports
    {
      provide: 'EmailProviderPort',
      useExisting: PowerAutomateEmailAdapter,
    },
    {
      provide: 'TemplateRendererPort',
      useExisting: HandlebarsTemplateRendererAdapter,
    },
    {
      provide: 'NotificationProviderPort',
      useExisting: TeamsNotificationAdapter,
    },
  ],
  exports: [
    SendEmailUseCase,
    SendExpenseRequestTeamsNotificationUseCase,
    SendApprovalTeamsNotificationUseCase,
    SendRejectionTeamsNotificationUseCase,
    SendDispersalTeamsNotificationUseCase,
    SendTreasurerTeamsNotificationUseCase,
    SendSentTeamsNotificationUseCase,
  ],
})
export class MailModule {}
