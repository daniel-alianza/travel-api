import type { AuthTokenVerifiedPayload } from '../../../auth/application/interfaces/auth-token.service.interface';

export function usuarioTienePermisoModuloContabilidad(
  user: AuthTokenVerifiedPayload,
): boolean {
  return (
    user.iamPermissionCodes.includes('contabilidad.autorizar') ||
    user.iamPermissionCodes.includes('comprobacion.revisar')
  );
}

function normalizarRol(role: string): string {
  return role.trim().toLowerCase();
}

export function usuarioTieneVistaConsolidada(
  user: AuthTokenVerifiedPayload,
): boolean {
  const rol = normalizarRol(user.role);
  if (rol.includes('super_administrador')) {
    return true;
  }
  if (rol.includes('lider') || rol.includes('gerente')) {
    return true;
  }
  if (
    rol.includes('administrador') &&
    usuarioTienePermisoModuloContabilidad(user)
  ) {
    return true;
  }
  return false;
}

export function usuarioPuedeConsultarIndicadoresContabilidad(
  user: AuthTokenVerifiedPayload,
): boolean {
  if (usuarioTieneVistaConsolidada(user)) {
    return true;
  }
  return usuarioTienePermisoModuloContabilidad(user);
}
