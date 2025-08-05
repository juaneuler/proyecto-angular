import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBaja } from './form-baja';

describe('FormBaja', () => {
  let component: FormBaja;
  let fixture: ComponentFixture<FormBaja>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormBaja]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormBaja);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
