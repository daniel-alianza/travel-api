export interface StatusSeedInput {
  id: number;
  name: string;
}

export interface StatusRepository {
  findAll(): Promise<StatusSeedInput[]>;
  upsertMany(input: StatusSeedInput[]): Promise<void>;
}
