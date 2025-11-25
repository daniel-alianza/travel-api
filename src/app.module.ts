import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { BranchesModule } from './branches/branches.module';
import { AreaModule } from './area/area.module';
import { TravelCardManagementModule } from './travel-card-management/travel-card-management.module';
import { TravelRequestModule } from './travel-request/travel-request.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    CompaniesModule,
    BranchesModule,
    AreaModule,
    TravelCardManagementModule,
    TravelRequestModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
