export interface BranchSeedInput {
  id: number;
  name: string;
  companyId: number;
}

export interface BranchRepository {
  findAll(): Promise<BranchSeedInput[]>;
  upsertMany(input: BranchSeedInput[]): Promise<void>;
}

