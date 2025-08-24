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
import { AlumnosState } from '../../alumnos-estado';
import { SnackbarNotification } from '../../../../../shared/services/snackbar-notification';
import { RouterModule } from '@angular/router';
import { AppRoutes } from '../../../../../shared/enums/routes';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Student } from '../../../../../shared/entities';

@Component({
  selector: 'app-delete-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
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

  students$: Observable<Student[]>;
  loading$ = new BehaviorSubject<boolean>(false);

  private studentsValue: Student[] = [];

  constructor(private fb: FormBuilder) {
    // Inicializamos el observable
    this.students$ = this.alumnosState.students$.pipe(
      tap((students) => (this.studentsValue = students))
    );
  }

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      dni: ['', [Validators.required, Validators.pattern(/^[1-9]\d{6,7}$/)]],
      descripcion: [
        '',
        [
          Validators.required,
          Validators.minLength(10), // Motivo de la baja: al menos 10 caracteres
          Validators.maxLength(50), // Motivo de la baja: máximo 50 caracteres
        ],
      ],
    });
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
      }
    }
  }

  onReset() {
    this.studentForm.reset();
  }
}