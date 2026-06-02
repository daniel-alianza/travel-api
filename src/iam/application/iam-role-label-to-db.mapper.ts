import { BadRequestException } from '@nestjs/common';

const ETIQUETAS_ROL_VALIDAS = [
  'Super Admin',
  'Administrador',
  'Supervisor',
  'Colaborador',
] as const;

export function iamRoleLabelToDbName(etiquetaRol: string): string {
  const etiqueta = etiquetaRol.trim();
  switch (etiqueta) {
    case 'Super Admin':
      return 'super_administrador';
    case 'Administrador':
      return 'administrador';
    case 'Supervisor':
      return 'lider/gerente';
    case 'Colaborador':
      return 'colaborador';
    default:
      throw new BadRequestException(
        `Rol no válido: "${etiqueta}". Valores permitidos: ${ETIQUETAS_ROL_VALIDAS.join(', ')}.`,
      );
  }
}
