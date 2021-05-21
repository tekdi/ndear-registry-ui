import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherConsentComponent } from './teacher-consent.component';

describe('TeacherConsentComponent', () => {
  let component: TeacherConsentComponent;
  let fixture: ComponentFixture<TeacherConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherConsentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
