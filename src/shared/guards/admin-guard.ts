import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthSelectors from '../../app/core/auth/store/auth.selectors';

export const adminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const store = inject(Store);
  const router = inject(Router);

  // Obtener el valor isAdmin directamente del store usando el selector de NgRx
  let isAdmin = false;
  store.select(AuthSelectors.selectIsAdmin)
    .subscribe(value => isAdmin = value)
    .unsubscribe();

  if (isAdmin) {
    return true;
  } else {
    return router.createUrlTree(['/unauthorized']);
  }
};