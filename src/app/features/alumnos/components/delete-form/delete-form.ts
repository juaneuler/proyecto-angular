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

  loading = false;

  constructor(private fb: FormBuilder) {}

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
      this.loading = true;

      setTimeout(() => {
        const dni = Number(this.studentForm.value.dni);
        const success = this.alumnosState.deleteStudent(dni);

        if (success) {
          this.snackbarNotification.success('Estudiante eliminado con éxito!');
          this.onReset();
        } else {
          this.snackbarNotification.error(
            'No se encontró ningún estudiante con ese DNI'
          );
        }
        this.loading = false;
      }, 1000);
    }
  }

  onReset() {
    this.studentForm.reset();
  }
}
