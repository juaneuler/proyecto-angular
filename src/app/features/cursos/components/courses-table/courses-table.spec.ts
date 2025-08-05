import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesTable } from './courses-table';

describe('CoursesTable', () => {
  let component: CoursesTable;
  let fixture: ComponentFixture<CoursesTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
