import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { UserRepository } from '../interfaces/user.repository';
import { UpdateUserInput, User } from '../interfaces/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepo: UserRepository,
  ) {}

  async execute(id: number, input: UpdateUserInput): Promise<User> {
    const user = await this.userRepo.findById(id);

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
    }

    const updateData: UpdateUserInput = { ...input };

    if (input.password) {
      updateData.password = await bcrypt.hash(input.password, 10);
    }

    return this.userRepo.update(id, updateData);
  }
}

