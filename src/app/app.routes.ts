import { Routes } from '@angular/router';
import { AppRoutes } from '../shared/enums/routes';
import { Home } from './home/home';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
  {
    path: AppRoutes.Home,
    component: Home,
  },
  {
    path: AppRoutes.Alumnos,
    loadChildren: () => import('./features/alumnos/alumnos.routes').then(m => m.ALUMNOS_ROUTES),
  },
  {
    path: AppRoutes.Cursos,
    loadChildren: () => import('./features/cursos/cursos.routes').then(m => m.CURSOS_ROUTES),
  },
  {
    path: AppRoutes.Inscripciones,
    loadChildren: () => import('./features/inscripciones/inscripciones.routes').then(m => m.INSCRIPCIONES_ROUTES),
  },
  { path: '**', component: NotFound },
];