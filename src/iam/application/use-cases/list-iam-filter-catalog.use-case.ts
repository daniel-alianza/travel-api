import { Injectable } from '@nestjs/common';
import { iamRoleDbNameToLabel } from '../iam-role-db-to-label.mapper';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';

export type IamFilterCatalogResponse = {
  areas: readonly string[];
  sucursales: readonly string[];
  rolesEtiqueta: readonly string[];
};

@Injectable()
export class ListIamFilterCatalogUseCase {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(): Promise<IamFilterCatalogResponse> {
    const [filasArea, filasSucursal, filasRol] = await Promise.all([
      this.prismaService.area.findMany({
        select: { name: true },
        orderBy: { name: 'asc' },
      }),
      this.prismaService.branch.findMany({
        select: { name: true },
        orderBy: { name: 'asc' },
      }),
      this.prismaService.role.findMany({
        select: { name: true },
        orderBy: { name: 'asc' },
      }),
    ]);

    const areas = filasArea
      .map((fila) => fila.name.trim())
      .filter((nombre) => nombre.length > 0);

    const sucursales = [
      ...new Set(
        filasSucursal
          .map((fila) => fila.name.trim())
          .filter((nombre) => nombre.length > 0),
      ),
    ].sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));

    const rolesEtiqueta = [
      ...new Set(
        filasRol.map((fila) =>
          iamRoleDbNameToLabel(fila.name.trim()),
        ),
      ),
    ].sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));

    return { areas, sucursales, rolesEtiqueta };
  }
}
