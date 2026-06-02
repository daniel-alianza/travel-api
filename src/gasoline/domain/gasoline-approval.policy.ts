export function isManagerRole(roleId: number | undefined): boolean {
  return roleId === 2 || roleId === 3;
}
