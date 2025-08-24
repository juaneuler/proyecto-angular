import { Component, OnInit } from '@angular/core';
import { AlumnosState } from '../../alumnos-estado';
import { Student } from '../../../../../shared/entities';
import { CommonModule } from '@angular/common';
import { StudentsTable } from '../../components/students-table/students-table';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AppRoutes } from '../../../../../shared/enums/routes';
import { AuthService } from '../../../../core/auth/auth-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-alumnos',
  imports: [CommonModule, StudentsTable, RouterOutlet, RouterModule],
  templateUrl: './alumnos.html',
  styleUrl: './alumnos.scss',
})
export class Alumnos implements OnInit {
  students$: Observable<Student[]>;
  loading: boolean = true;

  readonly AppRoutes = AppRoutes;

  constructor(
    private alumnosState: AlumnosState,
    public authService: AuthService
  ) {
    this.students$ = this.alumnosState.students$;
  }

  ngOnInit(): void {
    if (!this.alumnosState.getStudents().length) {
      this.alumnosState.loadStudents().subscribe(() => {
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  }
}
