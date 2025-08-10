import { Routes } from '@angular/router';
import { Alumnos } from './containers/alumnos/alumnos';
import { AddForm } from './components/add-form/add-form';
import { EditForm } from './components/edit-form/edit-form';
import { DeleteForm } from './components/delete-form/delete-form';
import { AppRoutes } from '../../../shared/enums/routes';

export const ALUMNOS_ROUTES: Routes = [
  { path: '', component: Alumnos },
  { path: AppRoutes.AlumnosAgregar, component: AddForm },
  { path: AppRoutes.AlumnosEditar, component: EditForm },
  { path: AppRoutes.AlumnosEliminar, component: DeleteForm },
];