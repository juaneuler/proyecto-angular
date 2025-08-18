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
import { Bigtitle } from '../../../../../shared/directives/bigtitle';
import { CursosState } from '../../cursos-estado';
import { SnackbarNotification } from '../../../../../shared/services/snackbar-notification';
import { RouterModule } from '@angular/router';
import { AppRoutes } from '../../../../../shared/enums/routes';
import { Course } from '../../../../../shared/entities';

@Component({
  selector: 'app-form-baja',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
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

  loading = false;
  courses: Course[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.cursosState.cursos$.subscribe((data) => {
      this.courses = data;
    });

    this.courseForm = this.fb.group({
      code: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}\d{3}$/)]],
      descripcion: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(50),
        ],
      ],
    });
  }

  onDelete() {
    if (this.courseForm.valid) {
      this.loading = true;
      const code = this.courseForm.value.code.trim().toUpperCase();
      const course = this.courses.find((c) => c.code === code);

      if (course) {
        this.cursosState.deleteCurso(course.customId).subscribe({
          next: () => {
            this.snackbarNotification.success('Curso eliminado con éxito!');
            this.onReset();
            this.loading = false;
          },
          error: (err: unknown) => {
            this.snackbarNotification.error('Error al eliminar el curso');
            this.loading = false;
          },
        });
      } else {
        this.snackbarNotification.error(
          'No se encontró ningún curso con ese código'
        );
        this.loading = false;
      }
    }
  }

  onReset() {
    this.courseForm.reset();
  }
}