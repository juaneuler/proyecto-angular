import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bigtitle } from '../../../../../shared/directives/bigtitle';
import { SnackbarNotification } from '../../../../../shared/services/snackbar-notification';
import { AlumnosState } from '../../alumnos-estado';
import { RouterModule } from '@angular/router';
import { AppRoutes } from '../../../../../shared/enums/routes';

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

  constructor(
    private fb: FormBuilder,
    private alumnosState: AlumnosState
  ) {}

  ngOnInit() {
    this.studentForm = this.fb.group({
      dni: ['', [
    Validators.required,
    Validators.pattern(/^[1-9]\d{6,7}$/) // Esto lo agrego para que en DNI ingresado tenga si o si entre 7 y 8 dígitos, y que no empiece con 0
    ]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]],
      average: ['', [Validators.required, Validators.min(0.1), Validators.max(10)]],
    });
  }

  loading = false;

  onSubmit() {
    if (this.studentForm.invalid) return;

    this.loading = true;

    setTimeout(() => {
      this.alumnosState.addStudent(this.studentForm.value);
      this.showAddedSuccesfully();
      this.onReset();
      this.loading = false;
    }, 1000);
  }

  onReset() {
    this.studentForm.reset();
  }

  showAddedSuccesfully() {
    this.snackbarNotification.success('Estudiante agregado exitosamente!');
  }
}