import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherMailComponent } from './teacher-mail.component';

describe('TeacherMailComponent', () => {
  let component: TeacherMailComponent;
  let fixture: ComponentFixture<TeacherMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherMailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
