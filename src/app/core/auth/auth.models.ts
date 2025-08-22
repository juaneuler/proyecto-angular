export type Role = 'admin' | 'user';

export interface AuthUser {
  username: string;
  role: Role;
  token?: string;
}

export interface Credentials {
  username: string;
  password: string;
}

/**
 * Base de conocimiento súper simple:
 * - admin / admin  → role: 'admin'
 * - user  / user   → role: 'user'
 */
export const KNOWN_USERS: Record<string, { password: string; role: Role }> = {
  admin: { password: 'admin', role: 'admin' },
  user:  { password: 'user',  role: 'user'  },
};