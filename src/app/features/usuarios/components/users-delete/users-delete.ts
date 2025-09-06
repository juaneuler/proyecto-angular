import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../../../../shared/entities';
import { SnackbarNotification } from '../../../../../shared/services/snackbar-notification';
import { UsuariosState } from '../../usuarios-estado';
import { RouterModule } from '@angular/router';
import { AppRoutes } from '../../../../../shared/enums/routes';
import { Observable, BehaviorSubject } from 'rxjs';
import { Bigtitle } from '../../../../../shared/directives/bigtitle';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-users-delete',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    RouterModule,
    Bigtitle,
  ],
  templateUrl: './users-delete.html',
  styleUrl: './users-delete.scss',
})
export class UsersDelete implements OnInit {
  readonly routes = AppRoutes;

  form: FormGroup;
  users$: Observable<User[]>;
  loading$ = new BehaviorSubject<boolean>(false);

  private usersValue: User[] = [];

  constructor(
    private fb: FormBuilder,
    private usuariosState: UsuariosState,
    private snackbar: SnackbarNotification
  ) {
    this.form = this.fb.group({
      userId: ['', Validators.required],
    });

    this.users$ = this.usuariosState.users$.pipe(
      tap((users) => (this.usersValue = users))
    );
  }

  ngOnInit(): void {
    if (!this.usuariosState.getUsers().length) {
      this.loading$.next(true);
      this.usuariosState.loadUsers().subscribe({
        next: (users) => {
          this.usersValue = users;
          this.loading$.next(false);
        },
        error: () => {
          this.snackbar.error('Error al cargar los usuarios');
          this.loading$.next(false);
        },
      });
    } else {
      this.usersValue = this.usuariosState.getUsers();
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.loading$.next(true);
      const userId = this.form.value.userId;

      // Usamos usersValue en lugar de getUsers()
      const user = this.usersValue.find((u) => u.id === userId);

      if (user) {
        this.usuariosState.deleteUser(user.id).subscribe({
          next: () => {
            this.snackbar.success('Usuario eliminado con éxito');
            this.onReset();
            this.loading$.next(false);
          },
          error: (err: unknown) => {
            this.snackbar.error('Error al eliminar el usuario');
            this.loading$.next(false);
          },
        });
      }
    }
  }

  onReset(): void {
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }
}
