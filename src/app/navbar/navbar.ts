import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Bigtitle } from '../../shared/directives/bigtitle';
import { AppRoutes } from '../../shared/enums/routes';
import { AuthService } from '../core/auth/auth-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [Bigtitle, RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  readonly AppRoutes = AppRoutes;

  constructor(public authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
