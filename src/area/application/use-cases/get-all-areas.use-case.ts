import { Inject, Injectable } from '@nestjs/common';
import type { AreaRepository } from '../interfaces/area.repository';
import { AreaSeedInput } from '../interfaces/area.repository';

@Injectable()
export class GetAllAreasUseCase {
  constructor(
    @Inject('AreaRepository') private readonly areaRepo: AreaRepository,
  ) {}

  async execute(): Promise<AreaSeedInput[]> {
    return await this.areaRepo.findAll();
  }
}

