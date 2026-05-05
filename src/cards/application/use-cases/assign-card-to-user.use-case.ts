import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import type {
  CardAssignmentUserRecord,
  CardRepository,
} from '../interfaces/card-repository.interface';

type AssignCardToUserCommand = {
  readonly userId: number;
  readonly cardNumber: string;
  readonly companyName: string;
  readonly cardType: 'VIATIC' | 'FUEL';
};

export type AssignCardToUserResponse = {
  readonly data: CardAssignmentUserRecord;
  readonly message: string;
  readonly error: null;
};

@Injectable()
export class AssignCardToUserUseCase {
  constructor(
    @Inject('CardRepository')
    private readonly cardRepository: CardRepository,
  ) {}

  async execute(command: AssignCardToUserCommand): Promise<AssignCardToUserResponse> {
    const result = await this.cardRepository.assignCardToUser(command);
    if (result === 'user_not_found') {
      throw new NotFoundException('El colaborador no existe.');
    }
    if (result === 'card_in_use') {
      throw new BadRequestException(
        'La tarjeta ya está asignada a otro colaborador activo.',
      );
    }
    const user = await this.cardRepository.findCardAssignmentUserById(command.userId);
    if (user === null) {
      throw new NotFoundException('No fue posible recuperar el colaborador actualizado.');
    }
    return {
      data: user,
      message: 'Tarjeta asignada correctamente.',
      error: null,
    };
  }
}
