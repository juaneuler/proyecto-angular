import { TestBed } from '@angular/core/testing';

import { InscripcionesEstado } from './inscripciones-estado';

describe('InscripcionesEstado', () => {
  let service: InscripcionesEstado;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InscripcionesEstado);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
