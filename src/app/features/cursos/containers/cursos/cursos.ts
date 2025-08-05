import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CoursesTable } from '../../components/courses-table/courses-table';
import { CursosFetch } from '../../cursos-fetch';
import { CursosState } from '../../cursos-estado';
import { Course } from '../../../../../shared/entities';
import { AppRoutes } from '../../../../../shared/enums/routes';

@Component({
  selector: 'app-cursos',
  imports: [CommonModule, RouterModule, RouterOutlet, CoursesTable],
  templateUrl: './cursos.html',
  styleUrl: './cursos.scss'
})
export class Cursos implements OnInit {
  courses: Course[] = [];
  loading = true;

  readonly AppRoutes = AppRoutes;

  constructor(
    private cursosFetch: CursosFetch,
    private cursosState: CursosState
  ) {}

  ngOnInit(): void {
    const currentState = this.cursosState['cursosSubject'].getValue();

    if (!currentState || currentState.length === 0) {
      this.cursosFetch.getCursos().subscribe((data) => {
        this.cursosState.setCursos(data);
        this.loading = false;
      });
    } else {
      this.loading = false;
    }

    this.cursosState.cursos$.subscribe((data) => {
      this.courses = data;
    });
  }
}