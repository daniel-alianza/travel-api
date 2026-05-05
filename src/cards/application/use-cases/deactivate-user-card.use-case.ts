import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type {
  CardAssignmentUserRecord,
  CardRepository,
} from '../interfaces/card-repository.interface';

export type DeactivateUserCardResponse =
  ApiSuccessResponse<CardAssignmentUserRecord>;

@Injectable()
export class DeactivateUserCardUseCase {
  constructor(
    @Inject('CardRepository')
    private readonly cardRepository: CardRepository,
  ) {}

  async execute(input: {
    readonly userId: number;
    readonly actorUserId?: number;
    readonly cardType: 'VIATIC' | 'FUEL';
  }): Promise<DeactivateUserCardResponse> {
    const result = await this.cardRepository.deactivateUserCard(input);
    if (result === 'user_not_found') {
      throw new NotFoundException('El colaborador no existe.');
    }
    const user = await this.cardRepository.findCardAssignmentUserById(
      input.userId,
    );
    if (user === null) {
      throw new NotFoundException(
        'No fue posible recuperar el colaborador actualizado.',
      );
    }
    return buildSuccessResponse(user, 'Tarjeta desactivada correctamente.');
  }
}
