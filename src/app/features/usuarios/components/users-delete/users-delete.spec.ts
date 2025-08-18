import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersDelete } from './users-delete';

describe('UsersDelete', () => {
  let component: UsersDelete;
  let fixture: ComponentFixture<UsersDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersDelete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersDelete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
