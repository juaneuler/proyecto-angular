import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInscripcion } from './add-inscripcion';

describe('AddInscripcion', () => {
  let component: AddInscripcion;
  let fixture: ComponentFixture<AddInscripcion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddInscripcion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInscripcion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
