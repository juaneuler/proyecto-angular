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
import { Student } from '../../../../../shared/entities';
import { Bigtitle } from '../../../../../shared/directives/bigtitle';
import { SnackbarNotification } from '../../../../../shared/services/snackbar-notification';
import { AlumnosState } from '../../alumnos-estado';
import { RouterModule } from '@angular/router';
import { AppRoutes } from '../../../../../shared/enums/routes';

@Component({
  selector: 'app-edit-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    Bigtitle,
    RouterModule
  ],
  templateUrl: './edit-form.html',
  styleUrl: './edit-form.scss',
})
export class EditForm implements OnInit {

  readonly routes = AppRoutes

  private alumnosState = inject(AlumnosState);
  private snackbarNotification = inject(SnackbarNotification);

  searchForm!: FormGroup;
  editForm!: FormGroup;
  selectedStudent: Student | null = null;

  students: Student[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.students = this.alumnosState.getStudents();

    this.searchForm = new FormGroup({
      dni: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[1-9]\d{6,7}$/),
      ]),
    });

    this.editForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      average: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.max(10),
          Validators.pattern(/^\d+(\.\d{1,2})?$/), // Esto es para que solo se puedan poner hasta 2 decimales
        ],
      ],
    });
  }

  onSearch() {
    const dni = Number(this.searchForm.value.dni);
    const student = this.students.find((student) => student.dni === dni);

    if (student) {
      this.selectedStudent = student;
      this.editForm.patchValue({
        name: student.name,
        surname: student.surname,
        age: student.age,
        average: student.average,
      });
    } else {
      this.snackbarNotification.error('Estudiante no encontrado.');
      this.selectedStudent = null;
    }
  }

  onEdit() {
    if (this.editForm.valid && this.selectedStudent) {
      const editedStudent: Student = {
        ...this.selectedStudent,
        ...this.editForm.value,
      };

      this.alumnosState.editStudent(editedStudent);
      this.snackbarNotification.success('Estudiante editado con éxito!');
      this.onReset();
    }
  }

  onReset() {
    this.searchForm.reset();
    this.editForm.reset();
    this.selectedStudent = null;
  }
}