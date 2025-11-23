import { Injectable } from '@nestjs/common';
import { BaseJwtStrategy, JwtPayload, RequestUser } from 'fg-portal-auth';
import { ValidateUserUseCase } from '../../application/use-cases';

@Injectable()
export class JwtStrategy extends BaseJwtStrategy {
  constructor(private readonly validateUserUseCase: ValidateUserUseCase) {
    super('access_token');
  }

  async validate(payload: JwtPayload): Promise<RequestUser> {
    const user = await this.validateUserUseCase.execute(payload);

    if (!user) {
      throw new Error('Usuario no encontrado o inactivo');
    }

    return user;
  }
}
