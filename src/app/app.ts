import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from './navbar/navbar';
import { Toolbar } from './toolbar/toolbar';
import { Footer } from './footer/footer';
import { RouterOutlet } from '@angular/router';
import { AlumnosState } from './features/alumnos/alumnos-estado';
import { CursosState } from './features/cursos/cursos-estado';
import { InscripcionesEstadoService } from './features/inscripciones/inscripciones-estado';
import { AuthService } from './core/auth/auth-service';
@Component({
  selector: 'app-root',
  imports: [CommonModule, Navbar, Toolbar, RouterOutlet, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  constructor(
    private alumnosState: AlumnosState,
    private cursosState: CursosState,
    private inscripcionesState: InscripcionesEstadoService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.alumnosState.loadStudents();
    this.cursosState.loadCursos();
    this.inscripcionesState.loadInscripciones();
  }
}
