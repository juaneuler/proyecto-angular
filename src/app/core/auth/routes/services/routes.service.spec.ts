import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';

import { RoutesService } from './routes.service';
import * as RoutesSelectors from '../store/routes.selectors';

describe('RoutesService', () => {
  let service: RoutesService;
  let store: MockStore;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RoutesService,
        provideMockStore() // Sin estado inicial
      ]
    });
    
    service = TestBed.inject(RoutesService);
    store = TestBed.inject(MockStore);
    
    // Configuramos el selector base
    store.overrideSelector(RoutesSelectors.selectRouteTitles, {
      '': 'Inicio',
      'alumnos': 'Listado de Alumnos',
      'cursos': 'Gestión de Cursos'
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have routeTitles$ as Observable', () => {
    expect(service.routeTitles$).toBeDefined();
    expect(service.routeTitles$ instanceof Observable).toBeTruthy();
  });

  it('should get route title as Observable', fakeAsync(() => {
    // Espiamos el método select del store
    const selectSpy = spyOn(store, 'select').and.returnValue(of('Listado de Alumnos'));
    
    let actualTitle: string | undefined;
    
    // Nos suscribimos al observable
    service.getRouteTitle('alumnos').subscribe(title => {
      actualTitle = title;
    });
    
    // Procesamos las tareas asíncronas pendientes
    tick();
    
    // Verificamos que se llamó al select
    expect(selectSpy).toHaveBeenCalled();
    expect(actualTitle).toBe('Listado de Alumnos');
  }));

  it('should return default title for unknown route', fakeAsync(() => {
    // Configuramos para ruta desconocida
    const selectSpy = spyOn(store, 'select').and.returnValue(of('Página sin título'));
    
    let actualTitle: string | undefined;
    
    service.getRouteTitle('ruta-desconocida').subscribe(title => {
      actualTitle = title;
    });
    
    tick();
    
    expect(selectSpy).toHaveBeenCalled();
    expect(actualTitle).toBe('Página sin título');
  }));

  it('should get route title synchronously', () => {
    const selectSpy = spyOn(store, 'select').and.returnValue(of('Gestión de Cursos'));
    
    const actualTitle = service.getRouteTitleSync('cursos');
    
    expect(selectSpy).toHaveBeenCalled();
    expect(actualTitle).toBe('Gestión de Cursos');
  });

  it('should return default title synchronously for unknown route', () => {
    const selectSpy = spyOn(store, 'select').and.returnValue(of('Página sin título'));
    
    const actualTitle = service.getRouteTitleSync('otra-ruta-desconocida');
    
    expect(selectSpy).toHaveBeenCalled();
    expect(actualTitle).toBe('Página sin título');
  });
});