import { Component, OnInit } from '@angular/core';
import { AlumnosFetch } from './../../alumnos-fetch';
import { AlumnosState } from '../../alumnos-estado';
import { Student } from '../../../../../shared/entities';
import { CommonModule } from '@angular/common';
import { StudentsTable } from '../../components/students-table/students-table';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AppRoutes } from '../../../../../shared/enums/routes';

@Component({
  selector: 'app-alumnos',
  imports: [CommonModule, StudentsTable, RouterOutlet, RouterModule],
  templateUrl: './alumnos.html',
  styleUrl: './alumnos.scss',
})
export class Alumnos implements OnInit {
  students: Student[] = [];
  loading: boolean = true;

  readonly AppRoutes = AppRoutes;

  constructor(
    private alumnosFetch: AlumnosFetch,
    private alumnosState: AlumnosState
  ) {}

  ngOnInit(): void {
    const currentState = this.alumnosState['studentsSubject'].getValue();
    if (!currentState || currentState.length === 0) {
      this.alumnosFetch.getAlumnos().subscribe((data) => {
        this.alumnosState.setStudents(data);
        this.loading = false;
      });
    } else {
      this.loading = false;
    }

    this.alumnosState.students$.subscribe((data) => {
      this.students = data;
    });
  }
}