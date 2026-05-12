import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ListIamFilterCatalogUseCase } from './application/use-cases/list-iam-filter-catalog.use-case';
import { ListIamUsersUseCase } from './application/use-cases/list-iam-users.use-case';
import { SetIamUserExtraPermissionsUseCase } from './application/use-cases/set-iam-user-extra-permissions.use-case';
import { SetIamUserPasswordUseCase } from './application/use-cases/set-iam-user-password.use-case';
import { IamController } from './presentation/iam.controller';
import { SuperAdminGuard } from './presentation/guards/super-admin.guard';

@Module({
  imports: [AuthModule],
  controllers: [IamController],
  providers: [
    ListIamUsersUseCase,
    ListIamFilterCatalogUseCase,
    SetIamUserPasswordUseCase,
    SetIamUserExtraPermissionsUseCase,
    SuperAdminGuard,
  ],
})
export class IamModule {}
