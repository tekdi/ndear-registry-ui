import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTeacherSignupComponent } from './student-teacher-signup.component';

describe('StudentTeacherSignupComponent', () => {
  let component: StudentTeacherSignupComponent;
  let fixture: ComponentFixture<StudentTeacherSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentTeacherSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTeacherSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
