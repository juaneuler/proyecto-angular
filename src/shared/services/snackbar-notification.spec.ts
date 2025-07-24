import { TestBed } from '@angular/core/testing';

import { SnackbarNotification } from './snackbar-notification';

describe('SnackbarNotification', () => {
  let service: SnackbarNotification;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackbarNotification);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
