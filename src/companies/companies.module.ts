import { Module } from '@nestjs/common';
import { CompaniesController } from './presentation/companies.controller';
import { PrismaModule } from '../infraestructure/prisma/prisma.module';
import { PrismaCompanyRepository } from './infraestructure/prisma-company.repository';
import { SeedCompaniesUseCase } from './application/use-cases/seed-companies.use-case';
import { GetAllCompaniesUseCase } from './application/use-cases/get-all-companies.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [CompaniesController],
  providers: [
    SeedCompaniesUseCase,
    PrismaCompanyRepository,
    GetAllCompaniesUseCase,
    {
      provide: 'CompanyRepository',
      useExisting: PrismaCompanyRepository,
    },
  ],
  exports: [SeedCompaniesUseCase],
})
export class CompaniesModule {}

