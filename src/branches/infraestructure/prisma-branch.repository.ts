import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infraestructure/prisma/prisma.service';
import {
  BranchRepository,
  BranchSeedInput,
} from '../application/interfaces/branch.repository';

@Injectable()
export class PrismaBranchRepository implements BranchRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<BranchSeedInput[]> {
    return await this.prisma.branch.findMany();
  }

  async upsertMany(input: BranchSeedInput[]): Promise<void> {
    for (const branch of input) {
      await this.prisma.branch.upsert({
        where: { id: branch.id },
        update: {
          name: branch.name,
          companyId: branch.companyId,
        },
        create: {
          id: branch.id,
          name: branch.name,
          companyId: branch.companyId,
        },
      });
    }
  }
}
