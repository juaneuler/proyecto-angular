import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Bigtitle } from '../../../../../shared/directives/bigtitle';
import { SnackbarNotification } from '../../../../../shared/services/snackbar-notification';
import { UsuariosState } from '../../usuarios-estado';
import { RouterModule } from '@angular/router';
import { AppRoutes } from '../../../../../shared/enums/routes';
import { User } from '../../../../../shared/entities';

@Component({
  selector: 'app-users-add',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Bigtitle,
    RouterModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './users-add.html',
  styleUrl: './users-add.scss',
})
export class UsersAdd implements OnInit {
  readonly routes = AppRoutes;

  userForm!: FormGroup;
  loading = false;
  roles: ('admin' | 'usuario')[] = ['admin', 'usuario'];

  constructor(
    private fb: FormBuilder,
    private usuariosState: UsuariosState,
    private snackbarNotification: SnackbarNotification
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
          Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/),
        ],
      ],
      rol: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const formValue = this.userForm.value;
    const userToAdd: Partial<User> = {
      nombre: formValue.nombre,
      rol: formValue.rol,
    };

    this.usuariosState.addUser(userToAdd).subscribe({
      next: () => {
        this.showAddedSuccessfully();
        this.onReset();
        this.loading = false;
      },
      error: (err: unknown) => {
        console.error('Error al agregar el usuario:', err);
        this.snackbarNotification.error('Error al agregar el usuario');
        this.loading = false;
      },
    });
  }

  onReset() {
    this.userForm.reset();
  }

  showAddedSuccessfully() {
    this.snackbarNotification.success('Usuario agregado exitosamente!');
  }
}
