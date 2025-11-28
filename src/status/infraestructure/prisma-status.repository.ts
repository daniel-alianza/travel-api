import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infraestructure/prisma/prisma.service';
import {
  StatusRepository,
  StatusSeedInput,
} from '../application/interfaces/status.repository';

@Injectable()
export class PrismaStatusRepository implements StatusRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<StatusSeedInput[]> {
    return await this.prisma.statusTravelRequest.findMany();
  }

  async upsertMany(input: StatusSeedInput[]): Promise<void> {
    for (const status of input) {
      await this.prisma.statusTravelRequest.upsert({
        where: { id: status.id },
        update: {},
        create: status,
      });
    }
  }
}
