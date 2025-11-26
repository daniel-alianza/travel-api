import {
  Inject,
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import type { UserRepository } from '../interfaces/user.repository';
import { CreateUserInput, User } from '../interfaces/user.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepo: UserRepository,
  ) {}

  async execute(input: CreateUserInput): Promise<User> {
    const exist = await this.userRepo.existsByEmail(input.email);

    if (exist) {
      throw new ConflictException('El correo ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);

    try {
      return await this.userRepo.create({
        ...input,
        password: hashedPassword,
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Error al crear el usuario';
      throw new InternalServerErrorException(message);
    }
  }
}
