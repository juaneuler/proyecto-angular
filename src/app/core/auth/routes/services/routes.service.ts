import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RouteDictionary } from '../models/route.model';
import * as RoutesSelectors from '../store/routes.selectors';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  readonly routeTitles$: Observable<RouteDictionary>;

  constructor(private store: Store) {
    this.routeTitles$ = this.store.select(RoutesSelectors.selectRouteTitles);
  }

  getRouteTitle(route: string): Observable<string> {
    return this.store.select(RoutesSelectors.selectRouteTitle(route));
  }

  getRouteTitleSync(route: string): string {
    let title = 'Sin título';
    this.store.select(RoutesSelectors.selectRouteTitle(route))
      .subscribe(t => title = t)
      .unsubscribe();
    return title;
  }
}