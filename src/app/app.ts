import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from './navbar/navbar';
import { Toolbar } from './toolbar/toolbar';
import { RouterOutlet } from '@angular/router';
import { AlumnosState } from './features/alumnos/alumnos-estado';
import { CursosState } from './features/cursos/cursos-estado';
@Component({
  selector: 'app-root',
  imports: [CommonModule, Navbar, Toolbar, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  constructor(
    private alumnosState: AlumnosState,
    private cursosState: CursosState
  ) {}

  ngOnInit(): void {
    this.alumnosState.loadStudents();
    this.cursosState.loadCursos();
  }
}