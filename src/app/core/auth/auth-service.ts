import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AuthUser, Credentials, KNOWN_USERS } from './auth.models';

const STORAGE_KEY = 'auth_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _user$ = new BehaviorSubject<AuthUser | null>(this.loadFromStorage());

  /** Usuario actual (observable) */
  readonly user$: Observable<AuthUser | null> = this._user$.asObservable();

  /** Está logueado? */
  readonly isLoggedIn$: Observable<boolean> = this.user$.pipe(map(Boolean));

  /** Es admin? */
  readonly isAdmin$: Observable<boolean> = this.user$.pipe(
    map(u => u?.role === 'admin')
  );

  /** Snapshot sincrónico (útil en guards) */
  get userSnapshot(): AuthUser | null {
    return this._user$.value;
  }

  /** Nombre para Toolbar */
  get displayName(): string {
    return this._user$.value?.username ?? 'Invitado';
  }

  /** Intento de login: true si está bien, y false si las credenciales son inválidas */
  login({ username, password }: Credentials): boolean {
    const record = KNOWN_USERS[username];
    if (!record || record.password !== password) {
      return false;
    }
    const logged: AuthUser = { username, role: record.role };
    this._user$.next(logged);
    this.saveToStorage(logged);
    return true;
  }

  /** Logout */
  logout(): void {
    this._user$.next(null);
    this.clearStorage();
  }

  // ─────────────── Persistencia simple ───────────────

  private saveToStorage(user: AuthUser): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } catch { /* no-op */ }
  }

  private loadFromStorage(): AuthUser | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) as AuthUser : null;
    } catch {
      return null;
    }
  }

  private clearStorage(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch { /* no-op */ }
  }
}