import { Injectable, NotFoundException } from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { isManagerRole } from '../../domain/gasoline-approval.policy';
import { GasolineNotificationRecipientService } from '../services/gasoline-notification-recipient.service';

type GetGasolineApprovalContextData = {
  readonly userId: number;
  readonly isTreasuryApprover: boolean;
  readonly isManagerRole: boolean;
};

export type GetGasolineApprovalContextResponse =
  ApiSuccessResponse<GetGasolineApprovalContextData>;

@Injectable()
export class GetGasolineApprovalContextUseCase {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly gasolineNotificationRecipientService: GasolineNotificationRecipientService,
  ) {}

  async execute(userId: number): Promise<GetGasolineApprovalContextResponse> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, roleId: true },
    });

    if (user === null) {
      throw new NotFoundException('Usuario no encontrado.');
    }

    const isTreasuryApprover =
      await this.gasolineNotificationRecipientService.isTreasuryApprover(
        user.email,
      );

    return buildSuccessResponse(
      {
        userId: user.id,
        isTreasuryApprover,
        isManagerRole: isManagerRole(user.roleId),
      },
      'Contexto de autorización de gasolina cargado correctamente.',
    );
  }
}
