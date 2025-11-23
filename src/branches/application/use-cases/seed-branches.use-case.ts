import { Inject, Injectable } from '@nestjs/common';
import type { BranchRepository } from '../interfaces/branch.repository';
import { BranchSeedInput } from '../interfaces/branch.repository';

@Injectable()
export class SeedBranchesUseCase {
  constructor(
    @Inject('BranchRepository') private readonly branchRepo: BranchRepository,
  ) {}

  async execute(): Promise<void> {
    const branches: BranchSeedInput[] = [
      {
        id: 1,
        name: 'Atizapán',
        companyId: 1,
      },
      {
        id: 2,
        name: 'Monterrey',
        companyId: 1,
      },
      {
        id: 3,
        name: 'León',
        companyId: 1,
      },
      {
        id: 4,
        name: 'San Luis',
        companyId: 1,
      },
      {
        id: 5,
        name: 'Puebla',
        companyId: 1,
      },
      {
        id: 6,
        name: 'Querétaro',
        companyId: 1,
      },
    ];

    await this.branchRepo.upsertMany(branches);
  }
}
