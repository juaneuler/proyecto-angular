import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEdicion } from './form-edicion';

describe('FormEdicion', () => {
  let component: FormEdicion;
  let fixture: ComponentFixture<FormEdicion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEdicion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEdicion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
