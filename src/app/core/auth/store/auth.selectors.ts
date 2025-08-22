import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

// Selector para obtener todo el estado de autenticación
export const selectAuthState = createFeatureSelector<AuthState>('auth');

// Selector para obtener el usuario actual
export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
);

// Selector para saber si el usuario está logueado
export const selectIsLoggedIn = createSelector(
  selectUser,
  user => !!user
);

// Selector para saber si el usuario es admin
export const selectIsAdmin = createSelector(
  selectUser,
  user => user?.role === 'admin'
);

// Selector para errores de autenticación
export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);

// Selector para estado de carga
export const selectAuthLoading = createSelector(
  selectAuthState,
  (state) => state.loading
);