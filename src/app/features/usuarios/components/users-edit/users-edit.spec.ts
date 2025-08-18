import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersEdit } from './users-edit';

describe('UsersEdit', () => {
  let component: UsersEdit;
  let fixture: ComponentFixture<UsersEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
