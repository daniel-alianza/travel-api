import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { iamRoleDbNameToLabel } from './iam-role-db-to-label.mapper';

export const NOMBRES_ROL_DB_JEFE_DIRECTO: readonly string[] = [
  'administrador',
  'lider/gerente',
];

type RoleRecord = {
  readonly id: number;
  readonly name: string;
};

export async function resolveIamRoleRecordByLabel(
  prismaService: PrismaService,
  roleLabel: string,
): Promise<RoleRecord | null> {
  const etiquetaEntrada = roleLabel.trim();
  if (etiquetaEntrada.length === 0) {
    return null;
  }

  const etiqueta =
    etiquetaEntrada === 'Supervisor' ? 'Líder/Gerente' : etiquetaEntrada;

  const roles = await prismaService.role.findMany({
    select: { id: true, name: true },
  });

  const porEtiqueta = roles.find(
    (rol) => iamRoleDbNameToLabel(rol.name.trim()) === etiqueta,
  );
  if (porEtiqueta !== undefined) {
    return porEtiqueta;
  }

  const porNombreDb = roles.find((rol) => rol.name.trim() === etiqueta);
  if (porNombreDb !== undefined) {
    return porNombreDb;
  }

  return null;
}

export function etiquetasRolElegiblesJefeDirecto(
  roles: readonly { readonly name: string }[],
): readonly string[] {
  const nombresJefeDirecto = new Set<string>(NOMBRES_ROL_DB_JEFE_DIRECTO);
  return [
    ...new Set(
      roles
        .filter((rol) => nombresJefeDirecto.has(rol.name.trim()))
        .map((rol) => iamRoleDbNameToLabel(rol.name.trim())),
    ),
  ].sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));
}
