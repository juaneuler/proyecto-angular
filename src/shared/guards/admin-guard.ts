import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  // Esto es un guard simple para demostrar que sé aplicar su uso. No hay validación de admin como tal porque mi app no implementa login, pero establecer una variable que tenga el isAdmin en true es suficiente para el ejemplo

  const router = inject(Router);

  // Esta es la variable para emular un login de admin
  const isAdmin = true; // Si cambiamos este booleano a false, se puede probar la funcionalidad!

  if (isAdmin) {
    return true; // Como isAdmin es true, se puede acceder
  } else {
    // El usuario no es admin, por lo que es redigirido a un componente de error!
    return router.createUrlTree(['/unauthorized']);
  }
};