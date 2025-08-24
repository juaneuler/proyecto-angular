import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Toolbar } from './toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { RoutesService } from '../core/auth/routes/services/routes.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Toolbar', () => {
  let component: Toolbar;
  let fixture: ComponentFixture<Toolbar>;
  
  // Mock simple para RoutesService
  const routesServiceMock = {
    getRouteTitle: jasmine.createSpy('getRouteTitle').and.returnValue(of('Página de prueba'))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        Toolbar  // Como es standalone, va en imports y no en declarations
      ],
      providers: [
        provideMockStore({
          initialState: { auth: { user: null } }
        }),
        { provide: RoutesService, useValue: routesServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignora los errores de componentes hijos
    })
    .compileComponents();

    fixture = TestBed.createComponent(Toolbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have currentUser$ observable', () => {
    expect(component.currentUser$).toBeTruthy();
  });

  it('should have pageTitle$ observable', () => {
    expect(component.pageTitle$).toBeTruthy();
  });

  it('should have currentRoute$ BehaviorSubject', () => {
    expect(component.currentRoute$).toBeTruthy();
  });
});