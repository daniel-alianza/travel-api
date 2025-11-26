import { Injectable } from '@nestjs/common';
import { SendTeamsNotificationUseCase } from './send-teams-notification.use-case';
import type { SendApprovalTeamsNotificationInput } from '../interfaces/teams-notification-options.interface';
import { TeamsNotificationMessage } from '../../domain/entities/email-message.entity';

@Injectable()
export class SendApprovalTeamsNotificationUseCase {
  constructor(
    private readonly sendTeamsNotificationUseCase: SendTeamsNotificationUseCase,
  ) {}

  async execute(input: SendApprovalTeamsNotificationInput): Promise<boolean> {
    const message = new TeamsNotificationMessage(
      'approved',
      input.requestId,
      input.userName,
      input.userEmail,
      input.managerEmail,
      input.managerName,
      'approved',
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
