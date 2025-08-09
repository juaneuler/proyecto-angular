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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      code: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Z]{2}\d{3}$/), // Mismo patrón de validación para que seamos coherentes a la hora de definir el código del curso
        ],
      ],
      descripcion: ['', [
        Validators.required,
        Validators.minLength(10), // Mínimo 10 caracteres para el motivo de baja
        Validators.maxLength(50), // Máximo 10 caracteres para el motivo de baja
      ]],
    });
  }

  onDelete() {
    if (this.courseForm.valid) {
      const code = this.courseForm.value.code.trim();
      const success = this.cursosState.deleteCurso(code);

      if (success) {
        this.snackbarNotification.success('Curso eliminado con éxito!');
        this.onReset();
      } else {
        this.snackbarNotification.error(
          'No se encontró ningún curso con ese código.'
        );
      }
    }
  }

  onReset() {
    this.courseForm.reset();
  }
}
