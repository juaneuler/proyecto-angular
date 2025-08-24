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
import { Course } from '../../../../../shared/entities';
import { BehaviorSubject } from 'rxjs';

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
      code: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}\d{3}$/)]],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\d]*$/),
        ],
      ],
      credits: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(10),
          Validators.pattern(/^\d+$/),
        ],
      ],
    });
  }

loading$ = new BehaviorSubject<boolean>(false);

  onSubmit() {
    if (this.courseForm.invalid) return;

    this.loading$.next(true);

    const formValue = this.courseForm.value;
    const courseToAdd: Course = {
      ...formValue,
      credits: Number(formValue.credits),
      customId: String(formValue.code).toLowerCase(),
    };

    this.cursosState.addCurso(courseToAdd).subscribe({
      next: () => {
        this.showAddedSuccessfully();
        this.onReset();
        this.loading$.next(false);
      },
      error: (err: unknown) => {
        this.snackbarNotification.error('Ocurrió un error al agregar el curso');
        this.loading$.next(false);
      },
    });
  }

  onReset() {
    this.courseForm.reset();
  }

  showAddedSuccessfully() {
    this.snackbarNotification.success('Curso agregado exitosamente!');
  }
}