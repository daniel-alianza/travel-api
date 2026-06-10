import type { PrismaClient } from '../../generated/prisma/client';

const AREA_NAMES: readonly string[] = [
  'Direccion',
  'Administración',
  'Almacén',
  'Atención a clientes',
  'Auditoría Externa',
  'Auditoría Interna',
  'Calidad',
  'Contabilidad',
  'Compras',
  'Ingeniería',
  'Logística',
  'Mantenimiento',
  'Manufactura',
  'Mercadotecnia',
  'Producción',
  'Recursos Humanos',
  'Seguridad e Higiene',
  'Tecnologías de la Información',
  'Tesoreria',
  'Innovación y Transformación Digital',
  'Ventas',
];

export async function seedAreas(prismaClient: PrismaClient): Promise<number> {
  const existingAreas = await prismaClient.area.findMany({
    select: { name: true },
  });

  const existingAreaNames = new Set<string>(
    existingAreas.map((area) => area.name),
  );

  const areasToCreate = AREA_NAMES.filter(
    (areaName) => !existingAreaNames.has(areaName),
  ).map((areaName) => ({ name: areaName }));

  if (areasToCreate.length === 0) {
    return 0;
  }

  const result = await prismaClient.area.createMany({
    data: areasToCreate,
  });

  return result.count;
}
