import { BadRequestException } from '@nestjs/common';

export function iamRoleLabelToDbName(etiquetaRol: string): string {
  const etiqueta = etiquetaRol.trim();
  switch (etiqueta) {
    case 'Super Admin':
      return 'super_administrador';
    case 'Administrador':
      return 'administrador';
    case 'Líder/Gerente':
    case 'Supervisor':
      return 'lider/gerente';
    case 'Colaborador':
      return 'colaborador';
    default:
      throw new BadRequestException(`Rol no válido: "${etiqueta}".`);
  }
}
