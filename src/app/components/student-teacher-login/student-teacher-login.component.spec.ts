import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTeacherLoginComponent } from './student-teacher-login.component';

describe('StudentTeacherLoginComponent', () => {
  let component: StudentTeacherLoginComponent;
  let fixture: ComponentFixture<StudentTeacherLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentTeacherLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTeacherLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
