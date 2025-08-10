import { Routes } from '@angular/router';
import { AppRoutes } from '../shared/enums/routes';
import { Home } from './home/home';
import { NotFound } from './not-found/not-found';
import { adminGuard } from '../shared/guards/admin-guard';
import { NotAuthorized } from './not-authorized/not-authorized';

export const routes: Routes = [
  {
    path: AppRoutes.Home,
    component: Home,
  },
  {
    path: AppRoutes.Alumnos,
    canActivate: [adminGuard], // Esto protege la ruta con el guard!
    loadChildren: () =>
      import('./features/alumnos/alumnos.routes').then((m) => m.ALUMNOS_ROUTES),
  },
  {
    path: AppRoutes.Cursos,
    canActivate: [adminGuard], // Esto protege la ruta con el guard!
    loadChildren: () =>
      import('./features/cursos/cursos.routes').then((m) => m.CURSOS_ROUTES),
  },
  {
    path: AppRoutes.Inscripciones,
    canActivate: [adminGuard], // Esto protege la ruta con el guard!
    loadChildren: () =>
      import('./features/inscripciones/inscripciones.routes').then(
        (m) => m.INSCRIPCIONES_ROUTES
      ),
  },
  { path: AppRoutes.Unauthorized, component: NotAuthorized },
  { path: '**', component: NotFound },
];