import { Inject, Injectable } from '@nestjs/common';
import type { UserRepository } from '../interfaces/user.repository';
import { User } from '../interfaces/user.repository';
import { PaginationInput } from '../interfaces/pagination.input';

@Injectable()
export class GetAllUsersUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepo: UserRepository,
  ) {}

  async execute(input?: PaginationInput): Promise<User[]> {
    return this.userRepo.findAll(input);
  }
}

