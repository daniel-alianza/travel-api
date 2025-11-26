import { Injectable } from '@nestjs/common';
import { SendTeamsNotificationUseCase } from './send-teams-notification.use-case';
import type { SendTreasurerTeamsNotificationInput } from '../interfaces/teams-notification-options.interface';
import { TeamsNotificationMessage } from '../../domain/entities/email-message.entity';

@Injectable()
export class SendTreasurerTeamsNotificationUseCase {
  constructor(
    private readonly sendTeamsNotificationUseCase: SendTeamsNotificationUseCase,
  ) {}

  async execute(input: SendTreasurerTeamsNotificationInput): Promise<boolean> {
    const message = new TeamsNotificationMessage(
      'treasurer',
      input.requestId,
      input.userName,
      input.userEmail,
      undefined,
      undefined,
      'pending_treasurer',
      input.totalAmount,
      undefined,
      undefined,
      input.selectedCard,
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
