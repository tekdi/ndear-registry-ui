import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAttestationComponent } from './teacher-attestation.component';

describe('TeacherAttestationComponent', () => {
  let component: TeacherAttestationComponent;
  let fixture: ComponentFixture<TeacherAttestationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherAttestationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAttestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
