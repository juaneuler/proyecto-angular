import { TestBed } from '@angular/core/testing';

import { AlumnosEstado } from './alumnos-estado';

describe('AlumnosEstado', () => {
  let service: AlumnosEstado;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlumnosEstado);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
