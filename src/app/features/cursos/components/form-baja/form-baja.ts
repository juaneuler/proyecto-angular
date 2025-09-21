import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Bigtitle } from '../../../../../shared/directives/bigtitle';
import { CursosState } from '../../cursos-estado';
import { SnackbarNotification } from '../../../../../shared/services/snackbar-notification';
import { RouterModule } from '@angular/router';
import { AppRoutes } from '../../../../../shared/enums/routes';
import { Course } from '../../../../../shared/entities';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-form-baja',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    Bigtitle,
    RouterModule,
  ],
  templateUrl: './form-baja.html',
  styleUrl: './form-baja.scss',
})
export class FormBaja implements OnInit {
  readonly routes = AppRoutes;

  private cursosState = inject(CursosState);
  private snackbarNotification = inject(SnackbarNotification);

  courseForm!: FormGroup;
  loading$ = new BehaviorSubject<boolean>(false);

  courses$ = this.cursosState.cursos$;

  private coursesValue: Course[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      code: ['', Validators.required],
      descripcion: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(50),
        ],
      ],
    });

    if (!this.cursosState.getCourses().length) {
      this.loading$.next(true);
      this.cursosState.loadCursos().subscribe({
        next: (courses) => {
          this.coursesValue = courses;
          this.loading$.next(false);
        },
        error: () => {
          this.snackbarNotification.error('Error al cargar los cursos');
          this.loading$.next(false);
        },
      });
    } else {
      this.coursesValue = this.cursosState.getCourses();
    }
  }

  onDelete() {
    if (this.courseForm.valid) {
      this.loading$.next(true);
      const code = this.courseForm.value.code.trim().toUpperCase();
      // Usamos coursesValue en lugar de courses
      const course = this.coursesValue.find((c) => c.code === code);

      if (course) {
        this.cursosState.deleteCurso(course.customId).subscribe({
          next: () => {
            this.snackbarNotification.success('Curso eliminado con éxito!');
            this.onReset();
            this.loading$.next(false);
          },
          error: (err: unknown) => {
            this.snackbarNotification.error('Error al eliminar el curso');
            this.loading$.next(false);
          },
        });
      } else {
        this.snackbarNotification.error(
          'No se encontró ningún curso con ese código'
        );
        this.loading$.next(false);
      }
    }
  }

  onReset() {
    this.courseForm.reset();
  }
}
