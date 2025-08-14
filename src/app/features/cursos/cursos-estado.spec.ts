import { TestBed } from '@angular/core/testing';

import { CursosState} from './cursos-estado';

describe('CursosEstado', () => {
  let service: CursosState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursosState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
