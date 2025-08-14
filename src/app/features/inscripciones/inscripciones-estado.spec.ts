import { TestBed } from '@angular/core/testing';

import { InscripcionesEstadoService } from './inscripciones-estado';

describe('InscripcionesEstado', () => {
  let service: InscripcionesEstadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InscripcionesEstadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
