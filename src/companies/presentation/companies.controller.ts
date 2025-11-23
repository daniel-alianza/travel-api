import { Controller, Get } from '@nestjs/common';
import { GetAllCompaniesUseCase } from '../application/use-cases/get-all-companies.use-case';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly getCompanies: GetAllCompaniesUseCase) {}

  @Get()
  async getAllCompanies() {
    const companies = await this.getCompanies.execute();

    return {
      success: true,
      message: 'Compañias obtenidas correctamente',
      data: companies,
    };
  }
}

