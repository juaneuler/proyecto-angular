import { TestBed } from '@angular/core/testing';
import { SnackbarNotification } from './snackbar-notification';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('SnackbarNotification', () => {
  let service: SnackbarNotification;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [
        SnackbarNotification,
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
    });

    service = TestBed.inject(SnackbarNotification);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call MatSnackBar.open with the correct arguments when using show()', () => {
    const message = 'Test message';
    const action = 'Cerrar';
    const duration = 3000;

    service.show(message, action, duration);

    expect(snackBarSpy.open).toHaveBeenCalledWith(message, action, {
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  });

  it('should call the show() method with a success message', () => {
    const showSpy = spyOn(service, 'show');

    const message = 'Success!';
    service.success(message);

    expect(showSpy).toHaveBeenCalledWith(message);
  });

  it('should call the show() method with an error message', () => {
    const showSpy = spyOn(service, 'show');

    const message = 'Error!';
    service.error(message);

    expect(showSpy).toHaveBeenCalledWith(message);
  });
});