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
import { CursosState } from '../../cursos-estado';
import { RouterModule } from '@angular/router';
import { AppRoutes } from '../../../../../shared/enums/routes';

@Component({
  selector: 'app-form-alta',
  imports: [CommonModule, ReactiveFormsModule, Bigtitle, RouterModule],
  templateUrl: './form-alta.html',
  styleUrl: './form-alta.scss',
})
export class FormAlta implements OnInit {
  readonly routes = AppRoutes;

  private snackbarNotification = inject(SnackbarNotification);

  courseForm!: FormGroup;

  constructor(private fb: FormBuilder, private cursosState: CursosState) {}

  ngOnInit() {
    this.courseForm = this.fb.group({
      code: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}\d{3}$/)]], // El código debe tener 2 letras seguidas de 3 números
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3), // Mínimo 3 caracteres
          Validators.maxLength(50), // Máximo 50 caracteres
          Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\d]*$/), // No se pueden usar caracteres especiales
        ],
      ],
      credits: [
        '',
        [
          Validators.required,
          Validators.min(1),  // Mínimo 1 crédito
          Validators.max(10), // Máximo 10 créditos
          Validators.pattern(/^\d+$/),
        ],
      ],
    });
  }

  loading = false;

  onSubmit() {
    if (this.courseForm.invalid) return;

    this.loading = true;

    setTimeout(() => {
      this.cursosState.addCurso(this.courseForm.value);
      this.showAddedSuccessfully();
      this.onReset();
      this.loading = false;
    }, 1000);
  }

  onReset() {
    this.courseForm.reset();
  }

  showAddedSuccessfully() {
    this.snackbarNotification.success('Curso agregado exitosamente!');
  }
}
