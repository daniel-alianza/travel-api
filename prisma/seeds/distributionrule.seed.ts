import type { PrismaClient } from '../../generated/prisma/client';

type CompanyRecord = {
  readonly id: number;
  readonly name: string;
};

type AreaRecord = {
  readonly id: number;
  readonly name: string;
};

type DistributionRuleCreateRecord = {
  readonly code: string;
  readonly name: string;
  readonly companyId: number;
  readonly areaId: number | null;
};

type DistributionRuleCreateManyResult = {
  readonly count: number;
};

type PrismaClientWithDistributionRuleDelegate = PrismaClient & {
  readonly company: {
    findMany(): Promise<readonly CompanyRecord[]>;
  };
  readonly area: {
    findMany(): Promise<readonly AreaRecord[]>;
  };
  readonly distributionRule: {
    deleteMany(args: Record<string, unknown>): Promise<unknown>;
    createMany(args: {
      data: readonly DistributionRuleCreateRecord[];
    }): Promise<DistributionRuleCreateManyResult>;
  };
};

function normalizeKey(value: string): string {
  return value
    .toUpperCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function normalizeCode(code: string): string {
  return code.trim().toUpperCase();
}

export async function seedDistributionRules(
  prismaClient: PrismaClient,
): Promise<number> {
  const prisma = prismaClient as PrismaClientWithDistributionRuleDelegate;

  const companies = await prisma.company.findMany();
  const companyMap = new Map(
    companies.map((company) => [normalizeKey(company.name), company.id]),
  );

  const alianzaId = companyMap.get(normalizeKey('Alianza Electrica'));
  const fgElectricalId = companyMap.get(normalizeKey('FG Electrical'));

  if (alianzaId == null || fgElectricalId == null) {
    throw new Error(
      'Companies "Alianza Electrica" and "FG Electrical" must exist. Run company seeder first.',
    );
  }

  const areas = await prisma.area.findMany();
  const areaMapByKey = new Map(
    areas.map((area) => [normalizeKey(area.name), area.id]),
  );

  function resolveAreaId(areaName: string): number {
    const id = areaMapByKey.get(normalizeKey(areaName));
    if (id == null) {
      throw new Error(`Area not found: ${areaName}`);
    }
    return id;
  }

  await prisma.distributionRule.deleteMany({});

  const viaticAlianza = [
    { code: 'A-BT', name: 'ADMINSTRACION BAJA TENSION' },
    { code: 'A-DF', name: 'ATIZAPAN ADMON' },
    { code: 'A-LEON', name: 'LEON ADMON' },
    { code: 'A-MTY', name: 'MONTERREY ADMON' },
    { code: 'A-PUE', name: 'PUEBLA ADMON' },
    { code: 'A-QRO', name: 'QUERETARO ADMON' },
    { code: 'A-SLP', name: 'SAN LUIS POTOSI ADMON' },
    { code: 'Corp', name: 'Corporativo' },
    { code: 'Dir', name: 'Direccion' },
    { code: 'MKT', name: 'MARKETING' },
    { code: 'O-BT', name: 'OPERACIONES BAJA TENSION' },
    { code: 'O-DF', name: 'DF OPERACIONES' },
    { code: 'O-GDL', name: 'GUADALAJARA OPERACIONES' },
    { code: 'O-LEON', name: 'LEON OPERACIONES' },
    { code: 'O-MTY', name: 'MONTERREY OPERACIONES' },
    { code: 'O-PUE', name: 'PUEBLA OPERACIONES' },
    { code: 'O-QRO', name: 'QUERETARO OPERACIONES' },
    { code: 'O-SLP', name: 'SAN LUIS POTOSI OPERACIONES' },
    { code: 'V-BT', name: 'VENTAS BAJA TENCION' },
    { code: 'V-DF', name: 'DF VENTAS' },
    { code: 'V-LEON', name: 'LEON VENTAS' },
    { code: 'V-MTY', name: 'MONTERREY VENTAS' },
    { code: 'V-PUE', name: 'PUEBLA VENTAS' },
    { code: 'V-QRO', name: 'QUERETARO VENTAS' },
    { code: 'V-SLP', name: 'SAN LUIS POTOSI VENTAS' },
  ].map((row) => ({
    code: normalizeCode(row.code),
    name: row.name,
    companyId: alianzaId,
    areaId: null as number | null,
  }));

  const viaticFg = [
    { code: 'ADMON', name: 'Administracion' },
    { code: 'BAN', name: 'Comisiones Bancos' },
    { code: 'COMP', name: 'Compras' },
    { code: 'CONTA', name: 'CONTABILIDAD' },
    { code: 'CORP', name: 'Corporativo' },
    { code: 'DIR', name: 'Direccion' },
    { code: 'MKT', name: 'Marketing' },
    { code: 'OP', name: 'Operaciones' },
    { code: 'RH', name: 'Recursos Humanos' },
    { code: 'SG', name: 'Servicios Generales' },
    { code: 'TI', name: 'Tecnologias de la Informacion' },
    { code: 'VENTAS', name: 'Ventas' },
  ].map((row) => ({
    code: normalizeCode(row.code),
    name: row.name,
    companyId: fgElectricalId,
    areaId: null as number | null,
  }));

  const fuelRows = [
    {
      companyId: alianzaId,
      areaId: resolveAreaId('Administración'),
      name: 'VENTAS CORPORITIVAS',
      code: 'V-CORP',
    },
    {
      companyId: alianzaId,
      areaId: resolveAreaId('Logística'),
      name: 'DF OPERACIONES',
      code: 'O-DF',
    },
    {
      companyId: alianzaId,
      areaId: resolveAreaId('Logística'),
      name: 'PUEBLA OPERACIONES',
      code: 'O-PUE',
    },
    {
      companyId: alianzaId,
      areaId: resolveAreaId('Logística'),
      name: 'LEON OPERACIONES',
      code: 'O-LEON',
    },
    {
      companyId: alianzaId,
      areaId: resolveAreaId('Logística'),
      name: 'MONTERREY OPERACIONES',
      code: 'O-MTY',
    },
    {
      companyId: alianzaId,
      areaId: resolveAreaId('Logística'),
      name: 'QUERETARO OPERACIONES',
      code: 'O-QRO',
    },
    {
      companyId: alianzaId,
      areaId: resolveAreaId('Logística'),
      name: 'SAN LUIS POTOSI OPERACIONES',
      code: 'O-SLP',
    },
    {
      companyId: alianzaId,
      areaId: resolveAreaId('Ventas'),
      name: 'SAN LUIS POTOSI VENTAS',
      code: 'V-SLP',
    },
    {
      companyId: alianzaId,
      areaId: resolveAreaId('Ventas'),
      name: 'LEON VENTAS',
      code: 'V-LEON',
    },
    {
      companyId: alianzaId,
      areaId: resolveAreaId('Ventas'),
      name: 'MONTERREY VENTAS',
      code: 'V-MTY',
    },
    {
      companyId: alianzaId,
      areaId: resolveAreaId('Ventas'),
      name: 'PUEBLA VENTAS',
      code: 'V-PUE',
    },
    {
      companyId: alianzaId,
      areaId: resolveAreaId('Ventas'),
      name: 'QUERETARO VENTAS',
      code: 'V-QRO',
    },
    {
      companyId: fgElectricalId,
      areaId: resolveAreaId('Direccion'),
      name: 'Direccion',
      code: 'DIR',
    },
    {
      companyId: fgElectricalId,
      areaId: resolveAreaId('Mercadotecnia'),
      name: 'Marketing',
      code: 'MKT',
    },
    {
      companyId: fgElectricalId,
      areaId: resolveAreaId('Logística'),
      name: 'Operaciones',
      code: 'OP',
    },
    {
      companyId: fgElectricalId,
      areaId: resolveAreaId('Ventas'),
      name: 'Ventas',
      code: 'VENTAS',
    },
  ].map((row) => ({
    companyId: row.companyId,
    areaId: row.areaId,
    name: row.name,
    code: normalizeCode(row.code),
  }));

  const result = await prisma.distributionRule.createMany({
    data: [...viaticAlianza, ...viaticFg, ...fuelRows],
  });

  return result.count;
}
