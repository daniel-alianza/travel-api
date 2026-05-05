import { Inject, Injectable } from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type {
  CardAssignmentUserRecord,
  CardAssignmentUsersQuery,
  CardRepository,
} from '../interfaces/card-repository.interface';

type GetCardAssignmentUsersData = {
  readonly items: readonly CardAssignmentUserRecord[];
  readonly meta: {
    readonly page: number;
    readonly pageSize: number;
    readonly total: number;
    readonly totalPages: number;
  };
};

export type GetCardAssignmentUsersResponse =
  ApiSuccessResponse<GetCardAssignmentUsersData>;

@Injectable()
export class GetCardAssignmentUsersUseCase {
  constructor(
    @Inject('CardRepository')
    private readonly cardRepository: CardRepository,
  ) {}

  async execute(query: CardAssignmentUsersQuery): Promise<GetCardAssignmentUsersResponse> {
    const users = await this.cardRepository.findCardAssignmentUsers(query);
    return buildSuccessResponse(
      {
        items: users.items,
        meta: {
          page: users.page,
          pageSize: users.pageSize,
          total: users.total,
          totalPages: users.totalPages,
        },
      },
      'Colaboradores cargados correctamente.',
    );
  }
}
