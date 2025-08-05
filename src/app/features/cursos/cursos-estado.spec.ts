import { TestBed } from '@angular/core/testing';

import { CursosEstado } from './cursos-estado';

describe('CursosEstado', () => {
  let service: CursosEstado;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursosEstado);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
