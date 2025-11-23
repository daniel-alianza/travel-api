import { Inject, Injectable } from '@nestjs/common';
import type { BranchRepository } from '../interfaces/branch.repository';
import { BranchSeedInput } from '../interfaces/branch.repository';

@Injectable()
export class GetAllBranchesUseCase {
  constructor(
    @Inject('BranchRepository') private readonly branchRepo: BranchRepository,
  ) {}

  async execute(): Promise<BranchSeedInput[]> {
    return this.branchRepo.findAll();
  }
}

