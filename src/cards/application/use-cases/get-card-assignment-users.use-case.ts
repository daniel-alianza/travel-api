import { Inject, Injectable } from '@nestjs/common';
import type {
  CardAssignmentUserRecord,
  CardAssignmentUsersQuery,
  CardRepository,
} from '../interfaces/card-repository.interface';

export type GetCardAssignmentUsersResponse = {
  readonly data: {
    readonly items: readonly CardAssignmentUserRecord[];
    readonly meta: {
      readonly page: number;
      readonly pageSize: number;
      readonly total: number;
      readonly totalPages: number;
    };
  };
  readonly message: string;
  readonly error: null;
};

@Injectable()
export class GetCardAssignmentUsersUseCase {
  constructor(
    @Inject('CardRepository')
    private readonly cardRepository: CardRepository,
  ) {}

  async execute(query: CardAssignmentUsersQuery): Promise<GetCardAssignmentUsersResponse> {
    const users = await this.cardRepository.findCardAssignmentUsers(query);
    return {
      data: {
        items: users.items,
        meta: {
          page: users.page,
          pageSize: users.pageSize,
          total: users.total,
          totalPages: users.totalPages,
        },
      },
      message: 'Colaboradores cargados correctamente.',
      error: null,
    };
  }
}
