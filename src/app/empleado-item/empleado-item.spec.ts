import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoItem } from './empleado-item';

describe('EmpleadoItem', () => {
  let component: EmpleadoItem;
  let fixture: ComponentFixture<EmpleadoItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadoItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadoItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
