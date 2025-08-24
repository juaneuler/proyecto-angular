import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Bigtitle } from '../../../../../shared/directives/bigtitle';
import { SnackbarNotification } from '../../../../../shared/services/snackbar-notification';
import { AlumnosState } from '../../alumnos-estado';
import { RouterModule } from '@angular/router';
import { AppRoutes } from '../../../../../shared/enums/routes';
import { StudentToAdd } from '../../../../../shared/entities';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-add-form',
  imports: [CommonModule, ReactiveFormsModule, Bigtitle, RouterModule],
  templateUrl: './add-form.html',
  styleUrl: './add-form.scss',
})
export class AddForm implements OnInit {
  readonly routes = AppRoutes;

  private snackbarNotification = inject(SnackbarNotification);

  studentForm!: FormGroup;

  constructor(private fb: FormBuilder, private alumnosState: AlumnosState) {}

  ngOnInit() {
    // Definimos un array de validadores para los campos de texto, así los reutilizamos en Nombre y Apellido
    const TEXT_INPUT_VALIDATORS = [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/),
    ];

    this.studentForm = this.fb.group({
      dni: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[1-9]\d{6,7}$/), // DNI con 7 u 8 dígitos, y no puede empezar con 0
        ],
      ],
      name: ['', TEXT_INPUT_VALIDATORS],
      surname: ['', TEXT_INPUT_VALIDATORS],
      age: [
        '',
        [
          Validators.required,
          Validators.min(1), // Que la edad sea al menos 1 año
          Validators.pattern(/^\d+$/),
        ],
      ],
      average: [
        '',
        [
          Validators.required,
          Validators.min(1), // Que el promedio sea siempre superior a 1
          Validators.max(10),
        ], // Que el promedio sea como máximo 10
      ],
    });
  }

loading$ = new BehaviorSubject<boolean>(false);

  onSubmit() {
    if (this.studentForm.invalid) return;

  this.loading$.next(true);

    const formValue = this.studentForm.value;
    const studentToAdd: StudentToAdd = {
      ...formValue,
      dni: Number(formValue.dni),
      age: Number(formValue.age),
      average: Number(formValue.average),
      customId: String(formValue.dni),
    };

    this.alumnosState.addStudent(studentToAdd).subscribe({
      next: () => {
        this.showAddedSuccesfully();
        this.onReset();
      this.loading$.next(false);
      },
      error: (err: unknown) => {
        this.snackbarNotification.error('Error al agregar el estudiante');
      this.loading$.next(false);
      },
    });
  }

  onReset() {
    this.studentForm.reset();
  }

  showAddedSuccesfully() {
    this.snackbarNotification.success('Estudiante agregado exitosamente!');
  }
}
