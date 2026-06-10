import { Injectable } from '@nestjs/common';
import { iamRoleDbNameToLabel } from '../iam-role-db-to-label.mapper';
import { etiquetasRolElegiblesJefeDirecto } from '../resolve-iam-role-by-label';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';

export type IamRegistroCatalogItem = {
  readonly id: number;
  readonly name: string;
};

export type IamRegistroSucursalCatalogItem = {
  readonly id: number;
  readonly name: string;
  readonly companyId: number | null;
};

export type IamFilterCatalogResponse = {
  areas: readonly string[];
  sucursales: readonly string[];
  rolesEtiqueta: readonly string[];
  rolesElegiblesJefeDirecto: readonly string[];
  registro: {
    empresas: readonly IamRegistroCatalogItem[];
    areas: readonly IamRegistroCatalogItem[];
    sucursales: readonly IamRegistroSucursalCatalogItem[];
  };
};

@Injectable()
export class ListIamFilterCatalogUseCase {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(): Promise<IamFilterCatalogResponse> {
    const [filasArea, filasSucursal, filasRol, filasEmpresa, filasAreaRegistro, filasSucursalRegistro] =
      await Promise.all([
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
      this.prismaService.company.findMany({
        select: { id: true, name: true },
        orderBy: { name: 'asc' },
      }),
      this.prismaService.area.findMany({
        select: { id: true, name: true },
        orderBy: { name: 'asc' },
      }),
      this.prismaService.branch.findMany({
        select: { id: true, name: true, companyId: true },
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
        filasRol.map((fila) => iamRoleDbNameToLabel(fila.name.trim())),
      ),
    ].sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));

    const rolesElegiblesJefeDirecto = etiquetasRolElegiblesJefeDirecto(filasRol);

    const empresas = filasEmpresa
      .map((fila) => ({
        id: fila.id,
        name: fila.name.trim(),
      }))
      .filter((fila) => fila.name.length > 0);

    const areasRegistro = filasAreaRegistro
      .map((fila) => ({
        id: fila.id,
        name: fila.name.trim(),
      }))
      .filter((fila) => fila.name.length > 0);

    const sucursalesRegistro = filasSucursalRegistro
      .map((fila) => ({
        id: fila.id,
        name: fila.name.trim(),
        companyId: fila.companyId,
      }))
      .filter((fila) => fila.name.length > 0);

    return {
      areas,
      sucursales,
      rolesEtiqueta,
      rolesElegiblesJefeDirecto,
      registro: {
        empresas,
        areas: areasRegistro,
        sucursales: sucursalesRegistro,
      },
    };
  }
}
