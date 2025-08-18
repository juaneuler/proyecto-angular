import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../core/auth/auth-service';
import { AuthUser } from '../core/auth/auth.models';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-toolbar',
  imports: [MatToolbarModule],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
})
export class Toolbar implements OnInit {
  currentUser: AuthUser | null = null;
  currentRoute: string = '';
  pageTitle: string = '';

  // Diccionario de títulos
  private readonly routeTitles: Record<string, string> = {
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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Usuario logueado
    this.authService.user$.subscribe((user) => {
      this.currentUser = user;
    });

    // Ruta actual, pero se actualiza mediante títulos dinámicos
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const ruta = event.urlAfterRedirects.replace('/', '');
        this.currentRoute = ruta || '';
        this.pageTitle = this.routeTitles[ruta] || 'Sin título';
      });
  }
}
