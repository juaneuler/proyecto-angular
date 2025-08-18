import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home } from './home';
import { AuthService } from '../core/auth/auth-service';
import { BehaviorSubject, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AuthUser } from '../core/auth/auth.models';

describe('Home Component', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  const userSubject = new BehaviorSubject<AuthUser | null>(null);

  beforeEach(async () => {
    // Crear el mock del AuthService
    mockAuthService = jasmine.createSpyObj('AuthService', [], {
      user$: userSubject.asObservable()
    });

    await TestBed.configureTestingModule({
      imports: [Home, CommonModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the main title and subtitle', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Bienvenido al sistema de gestión de alumnos!');
    expect(compiled.querySelector('h2')?.textContent).toContain('Hecho con Angular para el curso de Coderhouse');
  });

  it('should display login message when user is not logged in', () => {
    // Asegurarse que el usuario no está logueado
    userSubject.next(null);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const instructionText = compiled.querySelector('.instruction')?.textContent;
    expect(instructionText).toContain('Para comenzar, logueate haciendo click en \'Login\'');
    
    const helpText = compiled.querySelector('.help-text')?.textContent;
    expect(helpText).toContain('Necesitás acceder para utilizar todas las funcionalidades.');
  });

  it('should display personalized message when user is logged in', () => {
    // Simular usuario logueado
    const mockUser: AuthUser = { 
      username: 'admin', 
      role: 'admin',
    };
    userSubject.next(mockUser);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const instructionText = compiled.querySelector('.instruction')?.textContent;
    expect(instructionText).toContain('Hola, admin! Para comenzar, navegá usando la barra lateral!');
    
    const roleText = compiled.querySelector('.user-role')?.textContent;
    expect(roleText).toContain('Tu rol actual es: admin');
  });
});