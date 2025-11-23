export interface CompanySeedInput {
  id: number;
  name: string;
}

export interface CompanyRepository {
  findAll(): Promise<CompanySeedInput[]>;
  upsertMany(input: CompanySeedInput[]): Promise<void>;
}

