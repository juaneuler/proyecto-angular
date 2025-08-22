import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthUser, Credentials, KNOWN_USERS } from './auth.models';
import * as AuthActions from './store/auth.actions';
import * as AuthSelectors from './store/auth.selectors';

const STORAGE_KEY = 'auth_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Declaramos sin inicializar (lo hacemos en el constructor)
  readonly user$: Observable<AuthUser | null>;
  readonly isLoggedIn$: Observable<boolean>;
  readonly isAdmin$: Observable<boolean>;

  constructor(private store: Store, private router: Router) {
    this.user$ = this.store.select(AuthSelectors.selectUser);
    this.isLoggedIn$ = this.store.select(AuthSelectors.selectIsLoggedIn);
    this.isAdmin$ = this.store.select(AuthSelectors.selectIsAdmin);
    // Cargar usuario desde localStorage si existe
    const savedUser = this.loadFromStorage();
    if (savedUser) {
      this.store.dispatch(AuthActions.loadStoredUser({ user: savedUser }));
    }
  }

  /** Snapshot sincrónico (útil en guards) */
  get userSnapshot(): AuthUser | null {
    let user: AuthUser | null = null;
    this.user$.subscribe((u) => (user = u)).unsubscribe();
    return user;
  }

  /** Nombre para Toolbar */
  get displayName(): string {
    return this.userSnapshot?.username ?? 'Invitado';
  }

  /** Intento de login usando NgRx */
  login({ username, password }: Credentials): boolean {
    // Disparar acción de login
    this.store.dispatch(
      AuthActions.login({ credentials: { username, password } })
    );

    // Validación con la tabla de conocimiento
    const record = KNOWN_USERS[username];
    if (!record || record.password !== password) {
      this.store.dispatch(AuthActions.loginFailure());
      return false;
    }

    // Login exitoso
    const user: AuthUser = {
      username,
      role: record.role,
      token: 'mock-token', // Mantenemos el token para compatibilidad
    };

    this.store.dispatch(AuthActions.loginSuccess({ user }));
    this.saveToStorage(user);
    return true;
  }

  /** Logout con NgRx */
  logout(): void {
    this.store.dispatch(AuthActions.logout());
    this.clearStorage();
    // Redirección al login
    this.router.navigate(['/login']);
  }

  // ─────────────── Persistencia simple ───────────────

  private saveToStorage(user: AuthUser): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } catch {
      /* no-op */
    }
  }

  private loadFromStorage(): AuthUser | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      return null;
    }
  }

  private clearStorage(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* no-op */
    }
  }
}
