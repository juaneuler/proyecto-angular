import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInscripcion } from './edit-inscripcion';

describe('EditInscripcion', () => {
  let component: EditInscripcion;
  let fixture: ComponentFixture<EditInscripcion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditInscripcion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditInscripcion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
