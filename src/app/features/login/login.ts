import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth/auth-service';
import { AuthUser } from '../../core/auth/auth.models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AuthSelectors from '../../core/auth/store/auth.selectors';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  loginForm: FormGroup;
  loading$: Observable<boolean>;
  loginError$: Observable<boolean>;
  user$: Observable<AuthUser | null>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {
    this.loginForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z0-9_-]+$/), // Solo alfanuméricos, guiones y guiones bajos
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20), // Unificamos con el nombre de usuario
          Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/), // Permite alfanuméricos y caracteres especiales comunes
        ],
      ],
    });

    // Usamos el selector de NgRx para obtener el usuario
    this.user$ = this.store.select(AuthSelectors.selectUser);
    this.loginError$ = this.store.select(AuthSelectors.selectAuthError);
    this.loading$ = this.store.select(AuthSelectors.selectAuthLoading);
  }

  ngOnInit(): void {
    // Redireccionamos si ya está logueado
    this.user$.subscribe((user) => {
      if (user) {
        this.router.navigate(['']);
      }
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;
    this.authService.login({ username, password });
  }

  logout(): void {
    this.authService.logout();
  }
}
