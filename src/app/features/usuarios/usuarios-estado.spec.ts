import { TestBed } from '@angular/core/testing';

import { UsuariosEstado } from './usuarios-estado';

describe('UsuariosEstado', () => {
  let service: UsuariosEstado;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosEstado);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
