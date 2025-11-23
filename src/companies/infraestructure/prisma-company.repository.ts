import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infraestructure/prisma/prisma.service';
import {
  CompanyRepository,
  CompanySeedInput,
} from '../application/interfaces/company.repository';

@Injectable()
export class PrismaCompanyRepository implements CompanyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<CompanySeedInput[]> {
    return await this.prisma.company.findMany();
  }

  async upsertMany(input: CompanySeedInput[]): Promise<void> {
    for (const company of input) {
      await this.prisma.company.upsert({
        where: { id: company.id },
        update: {},
        create: company,
      });
    }
  }
}

