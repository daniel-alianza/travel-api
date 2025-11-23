import { Module } from '@nestjs/common';
import { PrismaModule } from '../infraestructure/prisma/prisma.module';
import { PrismaUserRepository } from './infraestructure/repositories';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { UsersController } from './presentation/users.controller';
import { GetAllUsersUseCase } from './application/use-cases/get-all-users.use-case';
import { GetUserByIdUseCase } from './application/use-cases/get-user-by-id.use-case';
import { DeleteUserByIdUseCase } from './application/use-cases/delete-user-by-id.use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user.use-case';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [UsersController],
  providers: [
    PrismaUserRepository,
    CreateUserUseCase,
    UpdateUserUseCase,
    GetAllUsersUseCase,
    GetUserByIdUseCase,
    DeleteUserByIdUseCase,
    {
      provide: 'UserRepository',
      useExisting: PrismaUserRepository,
    },
  ],
  exports: ['UserRepository', CreateUserUseCase],
})
export class UsersModule {}
