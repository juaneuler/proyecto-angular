import { TestBed } from '@angular/core/testing';

import { UsuariosState } from './usuarios-estado';

describe('UsuariosEstado', () => {
  let service: UsuariosState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
