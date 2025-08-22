import { RouteDictionary } from '../models/route.model';

/* Diccionario con todas las rutas y sus títulos correspondientes */

export const ROUTE_TITLES: RouteDictionary = {
  '': 'Inicio',
  alumnos: 'Gestión de Alumnos',
  'alumnos/agregar': 'Agregar Alumno',
  'alumnos/editar': 'Editar Alumno',
  'alumnos/eliminar': 'Eliminar Alumno',
  cursos: 'Gestión de Cursos',
  'cursos/alta': 'Alta de Curso',
  'cursos/edicion': 'Edición de Curso',
  'cursos/baja': 'Baja de Curso',
  inscripciones: 'Gestión de Inscripciones',
  'inscripciones/agregar': 'Nueva Inscripción',
  'inscripciones/modificar': 'Modificar Inscripción',
  'inscripciones/borrar': 'Eliminar Inscripción',
  login: 'Iniciar Sesión',
  unauthorized: 'Acceso No Autorizado',
  usuarios: 'Gestión de Usuarios',
  'usuarios/agregar': 'Agregar Usuario',
  'usuarios/editar': 'Editar Usuario',
  'usuarios/eliminar': 'Eliminar Usuario'
};