import { Inject, Injectable } from '@nestjs/common';
import type { UserRepository } from '../interfaces';
import { JwtPayload, RequestUser } from 'fg-portal-auth';

@Injectable()
export class ValidateUserUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(payload: JwtPayload): Promise<RequestUser | null> {
    const userId = Number(payload.sub);
    return await this.userRepository.findUserWithAppPermissions(userId);
  }
}
