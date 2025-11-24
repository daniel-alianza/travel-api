import { Injectable } from '@nestjs/common';
import { SendTeamsNotificationUseCase } from './send-teams-notification.use-case';
import type { SendExpenseRequestTeamsNotificationInput } from '../interfaces/teams-notification-options.interface';
import { TeamsNotificationMessage } from '../../domain/entities/email-message.entity';

@Injectable()
export class SendExpenseRequestTeamsNotificationUseCase {
  constructor(
    private readonly sendTeamsNotificationUseCase: SendTeamsNotificationUseCase,
  ) {}

  async execute(
    input: SendExpenseRequestTeamsNotificationInput,
  ): Promise<boolean> {
    const message = new TeamsNotificationMessage(
      'new_request',
      input.id,
      input.user.name,
      input.user.email,
      input.managerEmail || '',
      input.managerName || '',
      undefined,
      input.totalAmount,
      undefined,
      undefined,
      undefined,
      input.user.company.name,
      input.user.branch.name,
      input.travelReason,
      input.departureDate,
      input.returnDate,
      input.disbursementDate,
    );

    return this.sendTeamsNotificationUseCase.execute(message);
  }
}

