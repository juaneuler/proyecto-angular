import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RoutesState } from './routes.reducer';

export const selectRoutesState = createFeatureSelector<RoutesState>('routes');

export const selectRouteTitles = createSelector(
  selectRoutesState,
  (state) => state.routeTitles
);

export const selectRouteTitle = (route: string) => createSelector(
  selectRouteTitles,
  (titles) => titles[route] || 'Sin título'
);