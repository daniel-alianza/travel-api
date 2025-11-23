import { Inject, Injectable } from '@nestjs/common';
import type { CompanyRepository } from '../interfaces/company.repository';
import { CompanySeedInput } from '../interfaces/company.repository';

@Injectable()
export class SeedCompaniesUseCase {
  constructor(
    @Inject('CompanyRepository')
    private readonly companyRepo: CompanyRepository,
  ) {}

  async execute(): Promise<void> {
    const companies: CompanySeedInput[] = [
      { id: 1, name: 'Alianza Eléctrica' },
      { id: 2, name: 'FG Electrical' },
      { id: 3, name: 'FG Manufacturing' },
    ];

    await this.companyRepo.upsertMany(companies);
  }
}
