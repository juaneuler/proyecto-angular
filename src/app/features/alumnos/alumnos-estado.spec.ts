import { TestBed } from '@angular/core/testing';

import { AlumnosState } from './alumnos-estado';

describe('AlumnosEstado', () => {
  let service: AlumnosState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlumnosState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
