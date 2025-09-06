import { Component, OnInit } from '@angular/core';
import { AlumnosState } from '../../alumnos-estado';
import { Student } from '../../../../../shared/entities';
import { CommonModule } from '@angular/common';
import { StudentsTable } from '../../components/students-table/students-table';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AppRoutes } from '../../../../../shared/enums/routes';
import { AuthService } from '../../../../core/auth/auth-service';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-alumnos',
  imports: [CommonModule, StudentsTable, RouterOutlet, RouterModule],
  templateUrl: './alumnos.html',
  styleUrl: './alumnos.scss',
})
export class Alumnos implements OnInit {
  students$: Observable<Student[]>;
  loading$ = new BehaviorSubject<boolean>(true);
  isAdmin$: Observable<boolean>;

  readonly AppRoutes = AppRoutes;

  constructor(
    private alumnosState: AlumnosState,
    private authService: AuthService
  ) {
    this.students$ = this.alumnosState.students$;
    this.isAdmin$ = this.authService.isAdmin$;
  }

  ngOnInit(): void {
    if (!this.alumnosState.getStudents().length) {
      this.alumnosState.loadStudents().subscribe(() => {
        this.loading$.next(false);
      });
    } else {
      this.loading$.next(false);
    }
  }
}
