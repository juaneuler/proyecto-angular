import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAdd } from './users-add';

describe('UsersAdd', () => {
  let component: UsersAdd;
  let fixture: ComponentFixture<UsersAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
