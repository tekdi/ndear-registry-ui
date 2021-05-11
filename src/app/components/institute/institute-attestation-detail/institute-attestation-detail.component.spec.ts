import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteAttestationDetailComponent } from './institute-attestation-detail.component';

describe('InstituteAttestationDetailComponent', () => {
  let component: InstituteAttestationDetailComponent;
  let fixture: ComponentFixture<InstituteAttestationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstituteAttestationDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteAttestationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
