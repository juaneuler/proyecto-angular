import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsTable } from './students-table';

describe('StudentsTable', () => {
  let component: StudentsTable;
  let fixture: ComponentFixture<StudentsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
