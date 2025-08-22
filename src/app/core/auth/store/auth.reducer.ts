import { createReducer, on } from '@ngrx/store';
import { AuthUser } from '../auth.models';
import * as AuthActions from './auth.actions';

// Definir la estructura del estado
export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: boolean;
}

// Estado inicial
export const initialState: AuthState = {
  user: null,
  loading: false,
  error: false
};

// Crear el reducer
export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: false
  })),
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: false
  })),
  on(AuthActions.loginFailure, (state) => ({
    ...state,
    loading: false,
    error: true,
    user: null
  })),
  on(AuthActions.logout, () => ({
    ...initialState
  })),
  on(AuthActions.loadStoredUser, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: false
  }))
);