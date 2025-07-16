import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hijo } from './hijo';

describe('Hijo', () => {
  let component: Hijo;
  let fixture: ComponentFixture<Hijo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hijo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hijo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
