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
import { Student } from '../../../../../shared/entities';
import { Bigtitle } from '../../../../../shared/directives/bigtitle';
import { SnackbarNotification } from '../../../../../shared/services/snackbar-notification';
import { AlumnosState } from '../../alumnos-estado';
import { RouterModule } from '@angular/router';
import { AppRoutes } from '../../../../../shared/enums/routes';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    Bigtitle,
    RouterModule,
  ],
  templateUrl: './edit-form.html',
  styleUrl: './edit-form.scss',
})
export class EditForm implements OnInit {
  readonly routes = AppRoutes;

  private alumnosState = inject(AlumnosState);
  private snackbarNotification = inject(SnackbarNotification);

  searchForm!: FormGroup;
  editForm!: FormGroup;

  selectedStudent$ = new BehaviorSubject<Student | null>(null);
  loading$ = new BehaviorSubject<boolean>(false);
  students$: Observable<Student[]>;

  private studentsValue: Student[] = [];

  constructor(private fb: FormBuilder) {
    // Inicializar el observable de students y guardar el valor más reciente
    this.students$ = this.alumnosState.students$.pipe(
      tap((students) => (this.studentsValue = students))
    );
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      dni: ['', [Validators.required, Validators.pattern(/^[1-9]\d{6,7}$/)]],
    });

    // Array de validadores para los campos de texto de nombre y apellido
    const TEXT_INPUT_VALIDATORS = [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ];

    this.editForm = this.fb.group({
      name: ['', TEXT_INPUT_VALIDATORS],
      surname: ['', TEXT_INPUT_VALIDATORS],
      age: ['', [Validators.required, Validators.min(1)]],
      average: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(10),
          Validators.pattern(/^\d+(\.\d{1,2})?$/), // Esto es para que solo se puedan poner hasta 2 decimales
        ],
      ],
    });
  }

  onSearch() {
    const dni = Number(this.searchForm.value.dni);
    // Usamos studentsValue en lugar de students
    const student = this.studentsValue.find((student) => student.dni === dni);

    if (student) {
      this.selectedStudent$.next(student);
      this.editForm.patchValue({
        name: student.name,
        surname: student.surname,
        age: student.age,
        average: student.average,
      });
    } else {
      this.snackbarNotification.error('Estudiante no encontrado');
      this.selectedStudent$.next(null);
    }
  }

  onEdit() {
    const currentStudent = this.selectedStudent$.value;
    if (this.editForm.valid && currentStudent) {
      this.loading$.next(true);

      const editedStudent: Student = {
        ...currentStudent,
        ...this.editForm.value,
      };

      this.alumnosState.editStudent(editedStudent).subscribe({
        next: () => {
          this.snackbarNotification.success('Estudiante editado con éxito!');
          this.onReset();
          this.loading$.next(false);
        },
        error: (err: unknown) => {
          this.snackbarNotification.error('Error al editar el estudiante');
          this.loading$.next(false);
        },
      });
    }
  }

  onReset() {
    this.searchForm.reset();
    this.editForm.reset();
    this.selectedStudent$.next(null);
  }
}
