import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private fb: FormBuilder,
    private cursosState: CursosState
  ) {}

  ngOnInit() {
    this.courseForm = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      credits: ['', [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]],
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