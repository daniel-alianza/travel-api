import { Inject, Injectable } from '@nestjs/common';
import type { StatusRepository } from '../interfaces/status.repository';
import { StatusSeedInput } from '../interfaces/status.repository';

@Injectable()
export class SeedStatusUseCase {
  constructor(
    @Inject('StatusRepository') private readonly statusRepo: StatusRepository,
  ) {}

  async execute(): Promise<void> {
    const statuses: StatusSeedInput[] = [
      { id: 1, name: 'pendiente' },
      { id: 2, name: 'aprobada' },
      { id: 3, name: 'rechazada' },
      { id: 4, name: 'por comprobar' },
      { id: 5, name: 'comprobada' },
      { id: 6, name: 'subida a sap' },
      { id: 7, name: 'dispersada' },
    ];

    await this.statusRepo.upsertMany(statuses);
  }
}
