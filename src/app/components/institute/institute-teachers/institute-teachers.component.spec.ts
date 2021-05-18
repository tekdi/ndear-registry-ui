import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteTeachersComponent } from './institute-teachers.component';

describe('InstituteTeachersComponent', () => {
  let component: InstituteTeachersComponent;
  let fixture: ComponentFixture<InstituteTeachersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstituteTeachersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
