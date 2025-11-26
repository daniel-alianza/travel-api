import { Injectable } from '@nestjs/common';
import { SendTeamsNotificationUseCase } from './send-teams-notification.use-case';
import type { SendDispersalTeamsNotificationInput } from '../interfaces/teams-notification-options.interface';
import { TeamsNotificationMessage } from '../../domain/entities/email-message.entity';

@Injectable()
export class SendDispersalTeamsNotificationUseCase {
  constructor(
    private readonly sendTeamsNotificationUseCase: SendTeamsNotificationUseCase,
  ) {}

  async execute(input: SendDispersalTeamsNotificationInput): Promise<boolean> {
    const message = new TeamsNotificationMessage(
      'dispersed',
      input.requestId,
      input.userName,
      input.userEmail,
      undefined,
      undefined,
      'dispersed',
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
