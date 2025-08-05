import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAlta } from './form-alta';

describe('FormAlta', () => {
  let component: FormAlta;
  let fixture: ComponentFixture<FormAlta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAlta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAlta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
