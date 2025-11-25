/**
 * RBAC - Role-Based Access Control
 * Sistema de controle de acesso baseado em roles e permissões
 */

export enum Role {
  ADMIN = "admin",
  EDITOR = "editor",
  USER = "user",
}

export enum Permission {
  // Blog
  BLOG_CREATE = "blog:create",
  BLOG_READ = "blog:read",
  BLOG_UPDATE = "blog:update",
  BLOG_DELETE = "blog:delete",
  BLOG_PUBLISH = "blog:publish",

  // Cases
  CASE_CREATE = "case:create",
  CASE_READ = "case:read",
  CASE_UPDATE = "case:update",
  CASE_DELETE = "case:delete",
  CASE_PUBLISH = "case:publish",

  // Services
  SERVICE_CREATE = "service:create",
  SERVICE_READ = "service:read",
  SERVICE_UPDATE = "service:update",
  SERVICE_DELETE = "service:delete",

  // Media
  MEDIA_UPLOAD = "media:upload",
  MEDIA_DELETE = "media:delete",

  // Users
  USER_CREATE = "user:create",
  USER_READ = "user:read",
  USER_UPDATE = "user:update",
  USER_DELETE = "user:delete",

  // Settings
  SETTINGS_VIEW = "settings:view",
  SETTINGS_EDIT = "settings:edit",
}

/**
 * Mapeamento de roles para permissões
 */
const rolePermissions: Record<Role, Permission[]> = {
  // Admin tem todas as permissões
  [Role.ADMIN]: Object.values(Permission),

  // Editor pode criar e gerenciar conteúdo, mas não deletar usuários ou alterar settings críticas
  [Role.EDITOR]: [
    Permission.BLOG_CREATE,
    Permission.BLOG_READ,
    Permission.BLOG_UPDATE,
    Permission.BLOG_PUBLISH,
    Permission.CASE_CREATE,
    Permission.CASE_READ,
    Permission.CASE_UPDATE,
    Permission.CASE_PUBLISH,
    Permission.SERVICE_READ,
    Permission.MEDIA_UPLOAD,
    Permission.SETTINGS_VIEW,
  ],

  // User comum só pode visualizar
  [Role.USER]: [
    Permission.BLOG_READ,
    Permission.CASE_READ,
    Permission.SERVICE_READ,
  ],
};

/**
 * Verifica se um role tem determinada permissão
 * @param role - Role do usuário
 * @param permission - Permissão a ser verificada
 * @returns true se o role tem a permissão
 */
export function hasPermission(role: string, permission: Permission): boolean {
  const permissions = rolePermissions[role as Role];
  return permissions?.includes(permission) ?? false;
}

/**
 * Requer uma permissão específica, lançando erro se não tiver
 * @param role - Role do usuário
 * @param permission - Permissão requerida
 * @throws Error se não tiver a permissão
 */
export function requirePermission(role: string, permission: Permission): void {
  if (!hasPermission(role, permission)) {
    throw new Error(`Unauthorized: Missing permission ${permission}`);
  }
}

/**
 * Verifica múltiplas permissões (AND)
 * @param role - Role do usuário
 * @param permissions - Array de permissões a verificar
 * @returns true se tem TODAS as permissões
 */
export function hasAllPermissions(role: string, permissions: Permission[]): boolean {
  return permissions.every(permission => hasPermission(role, permission));
}

/**
 * Verifica múltiplas permissões (OR)
 * @param role - Role do usuário
 * @param permissions - Array de permissões a verificar
 * @returns true se tem ALGUMA das permissões
 */
export function hasAnyPermission(role: string, permissions: Permission[]): boolean {
  return permissions.some(permission => hasPermission(role, permission));
}

/**
 * Retorna todas as permissões de um role
 * @param role - Role do usuário
 * @returns Array de permissões
 */
export function getPermissions(role: string): Permission[] {
  return rolePermissions[role as Role] || [];
}

/**
 * Verifica se é admin
 * @param role - Role do usuário
 * @returns true se for admin
 */
export function isAdmin(role: string): boolean {
  return role === Role.ADMIN;
}

/**
 * Verifica se é editor ou admin
 * @param role - Role do usuário
 * @returns true se for editor ou admin
 */
export function canEdit(role: string): boolean {
  return role === Role.ADMIN || role === Role.EDITOR;
}
