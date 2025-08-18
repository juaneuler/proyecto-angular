import { Routes } from '@angular/router';
import { Cursos } from './containers/cursos/cursos';
import { FormAlta } from './components/form-alta/form-alta';
import { FormEdicion } from './components/form-edicion/form-edicion';
import { FormBaja } from './components/form-baja/form-baja';
import { AppRoutes } from '../../../shared/enums/routes';
import { adminGuard } from '../../../shared/guards/admin-guard';

export const CURSOS_ROUTES: Routes = [
  { path: '', component: Cursos },
  { path: AppRoutes.CursosAgregar, component: FormAlta },
  { path: AppRoutes.CursosEditar, component: FormEdicion, canActivate: [adminGuard] },
  { path: AppRoutes.CursosEliminar, component: FormBaja, canActivate: [adminGuard] },
];