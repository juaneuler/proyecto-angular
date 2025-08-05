import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionsTable } from './inscriptions-table';

describe('InscriptionsTable', () => {
  let component: InscriptionsTable;
  let fixture: ComponentFixture<InscriptionsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscriptionsTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscriptionsTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
