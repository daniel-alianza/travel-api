import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infraestructure/prisma/prisma.service';
import {
  AreaRepository,
  AreaSeedInput,
} from '../application/interfaces/area.repository';

@Injectable()
export class PrismaAreaRepository implements AreaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<AreaSeedInput[]> {
    return await this.prisma.area.findMany();
  }

  async upsertMany(input: AreaSeedInput[]): Promise<void> {
    for (const area of input) {
      await this.prisma.area.upsert({
        where: { id: area.id },
        update: {},
        create: area,
      });
    }
  }
}

