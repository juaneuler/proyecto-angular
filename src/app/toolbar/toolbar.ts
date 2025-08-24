import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { AuthUser } from '../core/auth/auth.models';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as AuthSelectors from '../core/auth/store/auth.selectors';
import { RoutesService } from '../core/auth/routes/services/routes.service';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  imports: [MatToolbarModule, CommonModule],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
})
export class Toolbar implements OnInit {
  currentUser$: Observable<AuthUser | null>;
  currentRoute$ = new BehaviorSubject<string>('');
  pageTitle$: Observable<string>;

  constructor(
    private router: Router,
    private store: Store,
    private routesService: RoutesService
  ) {
    this.currentUser$ = this.store.select(AuthSelectors.selectUser);
    this.pageTitle$ = of('Inicio');
  }

  ngOnInit(): void {
    // Ruta actual, usando el servicio de rutas con NgRx
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        ),
        map((event) => event.urlAfterRedirects.replace('/', '') || '')
      )
      .subscribe((ruta) => {
        this.currentRoute$.next(ruta);
      });

    // Reasignar pageTitle$ con la lógica completa
    this.pageTitle$ = this.currentRoute$.pipe(
      switchMap((route) => this.routesService.getRouteTitle(route))
    );
  }
}
