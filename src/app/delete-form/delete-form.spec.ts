import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteForm } from './delete-form';

describe('DeleteForm', () => {
  let component: DeleteForm;
  let fixture: ComponentFixture<DeleteForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
