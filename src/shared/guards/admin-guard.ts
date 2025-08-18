import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../app/core/auth/auth-service';

export const adminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si el usuario logueado es admin, entonces permitimos el acceso
  let isAdmin = false;
  authService.user$
    .subscribe((user) => {
      isAdmin = !!user && user.role == 'admin';
    })
    .unsubscribe();

  if (isAdmin) {
    return true;
  } else {
    return router.createUrlTree(['/unauthorized']);
  }
};
