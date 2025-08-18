import { Routes } from '@angular/router';
import { Inscripciones } from './containers/inscripciones/inscripciones';
import { AddInscripcion } from './components/add-inscripcion/add-inscripcion';
import { EditInscripcion } from './components/edit-inscripcion/edit-inscripcion';
import { DeleteInscripcion } from './components/delete-inscripcion/delete-inscripcion';
import { AppRoutes } from '../../../shared/enums/routes';
import { adminGuard } from '../../../shared/guards/admin-guard';

export const INSCRIPCIONES_ROUTES: Routes = [
  { path: '', component: Inscripciones },
  { path: AppRoutes.InscripcionesAgregar, component: AddInscripcion },
  { path: AppRoutes.InscripcionesEditar, component: EditInscripcion, canActivate: [adminGuard] },
  { path: AppRoutes.InscripcionesEliminar, component: DeleteInscripcion, canActivate: [adminGuard] },
];