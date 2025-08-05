import { TestBed } from '@angular/core/testing';

import { AlumnosFetch } from './alumnos-fetch';

describe('AlumnosFetch', () => {
  let service: AlumnosFetch;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlumnosFetch);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
