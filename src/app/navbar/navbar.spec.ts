import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Navbar } from './navbar';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../core/auth/auth-service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;
  
  // Crear un mock simple del AuthService
  const authServiceMock = {
    isAdmin$: of(false),
    user$: of(null),
    logout: jasmine.createSpy('logout')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        Navbar  // Como es standalone, va en imports y no en declarations
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Para ignorar la directiva appBigtitle
    })
    .compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have isAdmin$ observable', () => {
    expect(component.isAdmin$).toBeTruthy();
  });

  it('should have user$ observable', () => {
    expect(component.user$).toBeTruthy();
  });

  it('should call authService.logout when logout method is called', () => {
    component.logout();
    expect(authServiceMock.logout).toHaveBeenCalled();
  });
});