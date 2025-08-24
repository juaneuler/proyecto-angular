import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Bigtitle } from '../../../../../shared/directives/bigtitle';
import { SnackbarNotification } from '../../../../../shared/services/snackbar-notification';
import { CursosState } from '../../cursos-estado';
import { RouterModule } from '@angular/router';
import { AppRoutes } from '../../../../../shared/enums/routes';
import { Course } from '../../../../../shared/entities';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-form-edicion',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    Bigtitle,
    RouterModule,
  ],
  templateUrl: './form-edicion.html',
  styleUrl: './form-edicion.scss',
})
export class FormEdicion implements OnInit {
  readonly routes = AppRoutes;

  private cursosState = inject(CursosState);
  private snackbarNotification = inject(SnackbarNotification);

  searchForm!: FormGroup;
  editForm!: FormGroup;
  selectedCourse$ = new BehaviorSubject<Course | null>(null);

  courses$: Observable<Course[]>;
  loading$ = new BehaviorSubject<boolean>(false);

  private coursesValue: Course[] = [];

  constructor(private fb: FormBuilder) {
    this.courses$ = this.cursosState.cursos$.pipe(
      tap((courses) => (this.coursesValue = courses))
    );
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      code: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}\d{3}$/)]],
    });

    this.editForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\d]*$/),
        ],
      ],
      code: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}\d{3}$/)]],
      credits: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(10),
          Validators.pattern(/^\d+$/),
        ],
      ],
    });
  }

  onSearch() {
    if (this.searchForm.invalid) {
      return;
    }

    const code = this.searchForm.value.code.trim().toUpperCase();
    // Usamos coursesValue en lugar de courses
    const course = this.coursesValue.find((c) => c.code === code);

    if (course) {
      this.selectedCourse$.next(course);
      this.editForm.patchValue({
        name: course.name,
        code: course.code,
        credits: course.credits,
      });
    } else {
      this.snackbarNotification.error('Curso no encontrado.');
      this.selectedCourse$.next(null);
    }
  }

  onEdit() {
    if (this.editForm.valid && this.selectedCourse$.value) {
      this.loading$.next(true);

      const editedCourse: Course = {
        ...this.selectedCourse$.value,
        ...this.editForm.value,
        customId: this.editForm.value.code.toLowerCase(),
      };

      this.cursosState.editCurso(editedCourse).subscribe({
        next: () => {
          this.snackbarNotification.success('Curso editado con éxito!');
          this.onReset();
          this.loading$.next(false);
        },
        error: (err: unknown) => {
          this.snackbarNotification.error('Error al editar el curso');
          this.loading$.next(false);
        },
      });
    }
  }

  onReset() {
    this.searchForm.reset();
    this.editForm.reset();
    this.selectedCourse$.next(null);
  }
}
