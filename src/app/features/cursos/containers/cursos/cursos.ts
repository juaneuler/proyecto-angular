import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CoursesTable } from '../../components/courses-table/courses-table';
import { CursosState } from '../../cursos-estado';
import { Course } from '../../../../../shared/entities';
import { AppRoutes } from '../../../../../shared/enums/routes';

@Component({
  selector: 'app-cursos',
  imports: [CommonModule, RouterModule, RouterOutlet, CoursesTable],
  templateUrl: './cursos.html',
  styleUrl: './cursos.scss',
})
export class Cursos implements OnInit {
  courses: Course[] = [];
  loading = true;

  readonly AppRoutes = AppRoutes;

  constructor(private cursosState: CursosState) {}

  ngOnInit(): void {
    if (!this.cursosState.getCourses().length) {
      this.cursosState.loadCursos().subscribe(() => {
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