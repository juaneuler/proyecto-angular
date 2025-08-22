import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthUser } from '../core/auth/auth.models';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as AuthSelectors from '../core/auth/store/auth.selectors';
import { RoutesService } from '../core/auth/routes/services/routes.service';

@Component({
  selector: 'app-toolbar',
  imports: [MatToolbarModule, CommonModule],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
})
export class Toolbar implements OnInit {
  currentUser: AuthUser | null = null;
  currentRoute: string = '';
  pageTitle: string = '';

  constructor(
    private router: Router,
    private store: Store,
    private routesService: RoutesService
  ) {}

  ngOnInit(): void {
    // Usuario logueado desde NgRx
    this.store.select(AuthSelectors.selectUser).subscribe((user) => {
      this.currentUser = user;
    });

    // Ruta actual, usando el servicio de rutas con NgRx
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const ruta = event.urlAfterRedirects.replace('/', '');
        this.currentRoute = ruta || '';

        // Obtener el título del servicio
        this.routesService
          .getRouteTitle(this.currentRoute)
          .subscribe((title) => (this.pageTitle = title));
      });
  }
}
