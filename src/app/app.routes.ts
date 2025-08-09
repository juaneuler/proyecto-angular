import { Routes } from '@angular/router';
import { AppRoutes } from '../shared/enums/routes';
import { Home } from './home/home';
import { Alumnos } from './features/alumnos/containers/alumnos/alumnos';
import { AddForm } from './features/alumnos/components/add-form/add-form';
import { EditForm } from './features/alumnos/components/edit-form/edit-form';
import { DeleteForm } from './features/alumnos/components/delete-form/delete-form';
import { FormAlta } from './features/cursos/components/form-alta/form-alta';
import { FormEdicion } from './features/cursos/components/form-edicion/form-edicion';
import { FormBaja } from './features/cursos/components/form-baja/form-baja';
import { Cursos } from './features/cursos/containers/cursos/cursos';
import { Inscripciones } from './features/inscripciones/containers/inscripciones/inscripciones';
import { AddInscripcion } from './features/inscripciones/components/add-inscripcion/add-inscripcion';
import { EditInscripcion } from './features/inscripciones/components/edit-inscripcion/edit-inscripcion';
import { DeleteInscripcion } from './features/inscripciones/components/delete-inscripcion/delete-inscripcion';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
  {
    path: AppRoutes.Home,
    component: Home,
  },
  {
    path: AppRoutes.Alumnos,
    children: [
      { path: '', component: Alumnos },
      { path: AppRoutes.AlumnosAgregar, component: AddForm },
      { path: AppRoutes.AlumnosEditar, component: EditForm },
      { path: AppRoutes.AlumnosEliminar, component: DeleteForm },
    ],
  },
  {
    path: AppRoutes.Cursos,
    children: [
      { path: '', component: Cursos },
      { path: AppRoutes.CursosAgregar, component: FormAlta },
      { path: AppRoutes.CursosEditar, component: FormEdicion },
      { path: AppRoutes.CursosEliminar, component: FormBaja },
    ],
  },
  {
    path: AppRoutes.Inscripciones,
    children: [
      { path: '', component: Inscripciones },
      { path: AppRoutes.InscripcionesAgregar, component: AddInscripcion },
      { path: AppRoutes.InscripcionesEditar, component: EditInscripcion },
      { path: AppRoutes.InscripcionesEliminar, component: DeleteInscripcion },
    ],
  },
  { path: '**', component: NotFound },
];