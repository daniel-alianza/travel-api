import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { UserRepository } from '../interfaces/user.repository';

@Injectable()
export class DeleteUserByIdUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepo: UserRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new NotFoundException(`No se encontró un usuario con ID ${id}`);
    }
    await this.userRepo.deleteById(id);
  }
}

