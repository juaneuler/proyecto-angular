import { createReducer } from '@ngrx/store';
import { RouteDictionary } from '../models/route.model';
import { ROUTE_TITLES } from '../constants/route.constants';

export interface RoutesState {
  routeTitles: RouteDictionary;
}

// Aquí movemos el diccionario que estaba en el Toolbar
export const initialState: RoutesState = {
  routeTitles: ROUTE_TITLES
};

export const routesReducer = createReducer(initialState);