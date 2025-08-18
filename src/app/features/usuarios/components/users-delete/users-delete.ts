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
import { Observable } from 'rxjs';
import { Bigtitle } from '../../../../../shared/directives/bigtitle';

@Component({
  selector: 'app-users-delete',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    RouterModule,
    Bigtitle
  ],
  templateUrl: './users-delete.html',
  styleUrl: './users-delete.scss',
})
export class UsersDelete implements OnInit {
  readonly routes = AppRoutes;
  
  form: FormGroup;
  users$: Observable<User[]>;
  
  constructor(
    private fb: FormBuilder,
    private usuariosState: UsuariosState,
    private snackbar: SnackbarNotification
  ) {
    this.form = this.fb.group({
      userId: ['', Validators.required],
    });
    
    this.users$ = this.usuariosState.users$;
  }
  
  ngOnInit(): void {}
  
  onSubmit(): void {
    if (this.form.valid) {
      const userId = this.form.value.userId;
      
      // Buscar el usuario por ID para obtener toda la información
      const users = this.usuariosState.getUsers();
      const user = users.find(u => u.id === userId);
      
      if (user) {
        this.usuariosState.deleteUser(user.id).subscribe({
          next: () => {
            this.snackbar.success('Usuario eliminado con éxito');
            this.form.reset();
            this.form.markAsPristine();
            this.form.markAsUntouched();
          },
          error: (err: unknown) => {
            this.snackbar.error('Error al eliminar el usuario');
          }
        });
      } else {
        this.snackbar.error('Usuario no encontrado');
      }
    }
  }
  
  onReset(): void {
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }
}
