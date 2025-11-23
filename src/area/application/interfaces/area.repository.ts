export interface AreaSeedInput {
  id: number;
  name: string;
}

export interface AreaRepository {
  findAll(): Promise<AreaSeedInput[]>;
  upsertMany(input: AreaSeedInput[]): Promise<void>;
}

