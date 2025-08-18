import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../../../../shared/entities';
import { Bigtitle } from '../../../../../shared/directives/bigtitle';
import { SnackbarNotification } from '../../../../../shared/services/snackbar-notification';
import { UsuariosState } from '../../usuarios-estado';
import { RouterModule } from '@angular/router';
import { AppRoutes } from '../../../../../shared/enums/routes';
import { Observable, distinctUntilChanged, map, of } from 'rxjs';

@Component({
  selector: 'app-users-edit',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    Bigtitle,
    RouterModule,
  ],
  templateUrl: './users-edit.html',
  styleUrl: './users-edit.scss',
})
export class UsersEdit implements OnInit {
  readonly routes = AppRoutes;
  
  form: FormGroup;
  users$: Observable<User[]>;
  selectedUser: User | null = null;
  
  roles: ('admin' | 'usuario')[] = ['admin', 'usuario'];
  
  loading = false;
  
  constructor(
    private fb: FormBuilder,
    private usuariosState: UsuariosState,
    private snackbarNotification: SnackbarNotification
  ) {
    this.form = this.fb.group({
      userId: ['', Validators.required],
      rol: ['', Validators.required],
    });
    
    this.users$ = this.usuariosState.users$;
  }
  
  ngOnInit(): void {
    // Cuando cambie el usuario seleccionado
    this.form.get('userId')?.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(userId => {
        if (!userId) {
          this.selectedUser = null;
          this.form.get('rol')?.setValue('');
          return;
        }
        
        const users = this.usuariosState.getUsers();
        const user = users.find(u => u.id === userId);
        
        if (user) {
          this.selectedUser = user;
          this.form.get('rol')?.setValue(user.rol);
        }
      });
  }
  
  onSubmit() {
    if (this.form.valid && this.selectedUser) {
      this.loading = true;
      
      const editedUser: User = {
        ...this.selectedUser,
        rol: this.form.value.rol
      };
      
      this.usuariosState.editUser(editedUser).subscribe({
        next: () => {
          this.snackbarNotification.success('Usuario editado con éxito!');
          this.onReset();
          this.loading = false;
        },
        error: (err: unknown) => {
          this.snackbarNotification.error('Error al editar el usuario');
          this.loading = false;
        }
      });
    }
  }
  
  onReset() {
    this.form.reset();
    this.selectedUser = null;
  }
}