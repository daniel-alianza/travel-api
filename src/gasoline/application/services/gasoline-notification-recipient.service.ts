import { Inject, Injectable } from '@nestjs/common';
import type { GasolineNotificationRecipientRepository } from '../interfaces/gasoline-notification-recipient.repository.interface';

@Injectable()
export class GasolineNotificationRecipientService {
  constructor(
    @Inject('GasolineNotificationRecipientRepository')
    private readonly repository: GasolineNotificationRecipientRepository,
  ) {}

  async isTreasuryApprover(email: string | null | undefined): Promise<boolean> {
    if (email === null || email === undefined || email.trim().length === 0) {
      return false;
    }
    return this.repository.isActiveRecipient(email, 'treasury_approver');
  }

  async isTreasuryApproverByUserId(userId: number): Promise<boolean> {
    return this.repository.isActiveRecipientByUserId(
      userId,
      'treasury_approver',
    );
  }

  async listDispersalNotifyEmails(): Promise<readonly string[]> {
    return this.repository.listActiveEmailsByRole('dispersal_notify');
  }
}
