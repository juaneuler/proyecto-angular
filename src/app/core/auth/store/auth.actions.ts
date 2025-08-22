import { createAction, props } from '@ngrx/store';
import { AuthUser, Credentials } from '../auth.models';

// Acción para iniciar el proceso de login
export const login = createAction(
  '[Auth] Login',
  props<{ credentials: Credentials }>()
);

// Acción cuando el login es exitoso
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: AuthUser }>()
);

// Acción cuando el login falla
export const loginFailure = createAction('[Auth] Login Failure');

// Acción para cerrar sesión
export const logout = createAction('[Auth] Logout');

// Acción para cargar usuario desde localStorage
export const loadStoredUser = createAction(
  '[Auth] Load Stored User',
  props<{ user: AuthUser }>()
);