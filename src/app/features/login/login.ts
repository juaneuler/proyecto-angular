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

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  loginForm: FormGroup;
  loginError = false;
  loading = false;
  user$: Observable<AuthUser | null>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.user$ = this.authService.user$;
  }

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      if (user) {
        this.router.navigate(['']);
      }
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;
    this.loading = true;
    const { username, password } = this.loginForm.value;
    const ok = this.authService.login({ username, password });
    this.loading = false;
    this.loginError = !ok;
  }

  logout(): void {
    this.authService.logout();
  }
}