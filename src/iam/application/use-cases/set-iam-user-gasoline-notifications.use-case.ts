import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import type { GasolineNotificationRecipientRepository } from '../../../gasoline/application/interfaces/gasoline-notification-recipient.repository.interface';

export type SetIamUserGasolineNotificationsCommand = {
  readonly targetUserId: number;
  readonly treasuryApprover: boolean;
  readonly dispersalNotify: boolean;
};

@Injectable()
export class SetIamUserGasolineNotificationsUseCase {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject('GasolineNotificationRecipientRepository')
    private readonly gasolineNotificationRecipientRepository: GasolineNotificationRecipientRepository,
  ) {}

  async execute(command: SetIamUserGasolineNotificationsCommand): Promise<void> {
    const user = await this.prismaService.user.findUnique({
      where: { id: command.targetUserId },
      select: { id: true },
    });

    if (user === null) {
      throw new NotFoundException('Usuario no encontrado.');
    }

    await this.gasolineNotificationRecipientRepository.setUserNotificationFlags(
      command.targetUserId,
      {
        treasuryApprover: command.treasuryApprover,
        dispersalNotify: command.dispersalNotify,
      },
    );
  }
}
