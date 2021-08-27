import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAttestationDetailComponent } from './teacher-attestation-detail.component';

describe('TeacherAttestationDetailComponent', () => {
  let component: TeacherAttestationDetailComponent;
  let fixture: ComponentFixture<TeacherAttestationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherAttestationDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAttestationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
