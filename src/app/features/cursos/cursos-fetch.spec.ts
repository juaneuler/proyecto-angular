import { TestBed } from '@angular/core/testing';

import { CursosFetch } from './cursos-fetch';

describe('CursosFetch', () => {
  let service: CursosFetch;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursosFetch);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
