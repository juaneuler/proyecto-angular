import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
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
  selectedCourse: Course | null = null;

  courses: Course[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.courses = this.cursosState.getCursos();

    this.searchForm = new FormGroup({
      code: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(6),
      ]),
    });

    this.editForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      credits: [
        '',
        [Validators.required, Validators.min(1), Validators.max(10)],
      ],
    });
  }

  onSearch() {
    const code = this.searchForm.value.code;
    if (!code) {
      this.snackbarNotification.error(
        'Por favor, ingrese un código para buscar.'
      );
      return;
    }

    const trimmedCode = code.trim();
    const course = this.courses.find((c) => c.code === trimmedCode);

    if (course) {
      this.selectedCourse = course;
      this.editForm.patchValue({
        name: course.name,
        code: course.code,
        credits: course.credits,
      });
    } else {
      this.snackbarNotification.error('Curso no encontrado.');
      this.selectedCourse = null;
    }
  }

  onEdit() {
    if (this.editForm.valid && this.selectedCourse) {
      const editedCourse: Course = {
        ...this.selectedCourse,
        ...this.editForm.value,
      };

      this.cursosState.editCurso(editedCourse);
      this.snackbarNotification.success('Curso editado con éxito!');
      this.onReset();
    }
  }

  onReset() {
    this.searchForm.reset();
    this.editForm.reset();
    this.selectedCourse = null;
  }
}
