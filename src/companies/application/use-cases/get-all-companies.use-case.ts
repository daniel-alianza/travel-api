import { Inject, Injectable } from '@nestjs/common';
import type { CompanyRepository } from '../interfaces/company.repository';
import { CompanySeedInput } from '../interfaces/company.repository';

@Injectable()
export class GetAllCompaniesUseCase {
  constructor(
    @Inject('CompanyRepository')
    private readonly companyRepo: CompanyRepository,
  ) {}

  async execute(): Promise<CompanySeedInput[]> {
    return this.companyRepo.findAll();
  }
}
