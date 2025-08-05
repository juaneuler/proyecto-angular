import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteInscripcion } from './delete-inscripcion';

describe('DeleteInscripcion', () => {
  let component: DeleteInscripcion;
  let fixture: ComponentFixture<DeleteInscripcion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteInscripcion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteInscripcion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
