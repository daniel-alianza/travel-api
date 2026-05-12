export function iamRoleDbNameToLabel(nombreRol: string): string {
  switch (nombreRol) {
    case 'super_administrador':
      return 'Super Admin';
    case 'administrador':
      return 'Administrador';
    case 'lider/gerente':
      return 'Supervisor';
    case 'colaborador':
      return 'Colaborador';
    default:
      return nombreRol;
  }
}
