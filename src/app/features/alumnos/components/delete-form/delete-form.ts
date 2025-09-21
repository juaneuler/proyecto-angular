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
import { AlumnosState } from '../../alumnos-estado';
import { SnackbarNotification } from '../../../../../shared/services/snackbar-notification';
import { RouterModule } from '@angular/router';
import { AppRoutes } from '../../../../../shared/enums/routes';
import { BehaviorSubject } from 'rxjs';
import { Student } from '../../../../../shared/entities';

@Component({
  selector: 'app-delete-form',
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
  templateUrl: './delete-form.html',
  styleUrl: './delete-form.scss',
})
export class DeleteForm implements OnInit {
  readonly routes = AppRoutes;

  private alumnosState = inject(AlumnosState);
  private snackbarNotification = inject(SnackbarNotification);

  studentForm!: FormGroup;
  loading$ = new BehaviorSubject<boolean>(false);

  students$ = this.alumnosState.students$;

  private studentsValue: Student[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      dni: ['', Validators.required],
      descripcion: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(50),
        ],
      ],
    });

    if (!this.alumnosState.getStudents().length) {
      this.loading$.next(true);
      this.alumnosState.loadStudents().subscribe({
        next: (students) => {
          this.studentsValue = students;
          this.loading$.next(false);
        },
        error: () => {
          this.snackbarNotification.error('Error al cargar los estudiantes');
          this.loading$.next(false);
        }
      });
    } else {
      this.studentsValue = this.alumnosState.getStudents();
    }
  }

  onDelete() {
    if (this.studentForm.valid) {
      this.loading$.next(true);

      const dni = Number(this.studentForm.value.dni);
      // Usamos studentsValue en lugar de getStudents()
      const student = this.studentsValue.find((s) => s.dni === dni);

      if (student) {
        this.alumnosState.deleteStudent(student.customId).subscribe({
          next: () => {
            this.snackbarNotification.success(
              'Estudiante eliminado con éxito!'
            );
            this.onReset();
            this.loading$.next(false);
          },
          error: (err: unknown) => {
            this.snackbarNotification.error('Error al eliminar el estudiante');
            this.loading$.next(false);
          },
        });
      } else {
        this.snackbarNotification.error('Estudiante no encontrado');
        this.loading$.next(false);
      }
    }
  }

  onReset() {
    this.studentForm.reset();
  }
}
