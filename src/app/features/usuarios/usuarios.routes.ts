import { Routes } from '@angular/router';
import { Usuarios } from './containers/usuarios/usuarios';
import { UsersAdd } from './components/users-add/users-add';
import { UsersEdit } from './components/users-edit/users-edit';
import { UsersDelete } from './components/users-delete/users-delete';
import { AppRoutes } from '../../../shared/enums/routes';
import { adminGuard } from '../../../shared/guards/admin-guard';

export const USUARIOS_ROUTES: Routes = [
  { path: '', component: Usuarios, canActivate: [adminGuard] },
  { path: AppRoutes.UsuariosAgregar, component: UsersAdd, canActivate: [adminGuard] },
  { path: AppRoutes.UsuariosEditar, component: UsersEdit, canActivate: [adminGuard] },
  { path: AppRoutes.UsuariosEliminar, component: UsersDelete, canActivate: [adminGuard] },
];