import { Injectable } from '@nestjs/common';
import { SendTeamsNotificationUseCase } from './send-teams-notification.use-case';
import type { SendRejectionTeamsNotificationInput } from '../interfaces/teams-notification-options.interface';
import { TeamsNotificationMessage } from '../../domain/entities/email-message.entity';

@Injectable()
export class SendRejectionTeamsNotificationUseCase {
  constructor(
    private readonly sendTeamsNotificationUseCase: SendTeamsNotificationUseCase,
  ) {}

  async execute(input: SendRejectionTeamsNotificationInput): Promise<boolean> {
    const message = new TeamsNotificationMessage(
      'rejected',
      input.requestId,
      input.userName,
      input.userEmail,
      input.managerEmail,
      input.managerName,
      'rejected',
      input.totalAmount,
      undefined,
      input.comment,
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
