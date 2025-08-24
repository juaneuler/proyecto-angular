import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Bigtitle } from '../../shared/directives/bigtitle';
import { AppRoutes } from '../../shared/enums/routes';
import { AuthService } from '../core/auth/auth-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthUser } from '../core/auth/auth.models';
@Component({
  selector: 'app-navbar',
  imports: [Bigtitle, RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  readonly AppRoutes = AppRoutes;

  isAdmin$: Observable<boolean>;
  user$: Observable<AuthUser | null>;

  constructor(
    public authService: AuthService, 
    private router: Router,
  ) {
        this.isAdmin$ = this.authService.isAdmin$;
    this.user$ = this.authService.user$;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
