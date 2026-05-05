import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type {
  CardAssignmentUserRecord,
  CardRepository,
} from '../interfaces/card-repository.interface';

export type DeactivateUserCardResponse = {
  readonly data: CardAssignmentUserRecord;
  readonly message: string;
  readonly error: null;
};

@Injectable()
export class DeactivateUserCardUseCase {
  constructor(
    @Inject('CardRepository')
    private readonly cardRepository: CardRepository,
  ) {}

  async execute(input: {
    readonly userId: number;
    readonly cardType: 'VIATIC' | 'FUEL';
  }): Promise<DeactivateUserCardResponse> {
    const result = await this.cardRepository.deactivateUserCard(input);
    if (result === 'user_not_found') {
      throw new NotFoundException('El colaborador no existe.');
    }
    const user = await this.cardRepository.findCardAssignmentUserById(input.userId);
    if (user === null) {
      throw new NotFoundException('No fue posible recuperar el colaborador actualizado.');
    }
    return {
      data: user,
      message: 'Tarjeta desactivada correctamente.',
      error: null,
    };
  }
}
