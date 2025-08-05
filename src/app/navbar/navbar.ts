import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Bigtitle } from '../../shared/directives/bigtitle';
import { AppRoutes } from '../../shared/enums/routes';

@Component({
  selector: 'app-navbar',
  imports: [Bigtitle, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  readonly AppRoutes = AppRoutes;
}