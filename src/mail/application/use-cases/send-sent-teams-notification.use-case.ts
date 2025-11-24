import { Injectable } from '@nestjs/common';
import { SendTeamsNotificationUseCase } from './send-teams-notification.use-case';
import type { SendSentTeamsNotificationInput } from '../interfaces/teams-notification-options.interface';
import { TeamsNotificationMessage } from '../../domain/entities/email-message.entity';

@Injectable()
export class SendSentTeamsNotificationUseCase {
  constructor(
    private readonly sendTeamsNotificationUseCase: SendTeamsNotificationUseCase,
  ) {}

  async execute(input: SendSentTeamsNotificationInput): Promise<boolean> {
    const message = new TeamsNotificationMessage(
      'sent',
      input.requestId,
      input.userName,
      input.userEmail,
      input.managerEmail || '',
      input.managerName || '',
      'sent_to_sap',
      input.totalAmount,
      undefined,
      undefined,
      undefined,
      input.company,
      input.branch,
      undefined,
      undefined,
      undefined,
      undefined,
    );

    return this.sendTeamsNotificationUseCase.execute(message);
  }
}

