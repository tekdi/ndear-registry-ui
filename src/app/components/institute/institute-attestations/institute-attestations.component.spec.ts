import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteAttestationsComponent } from './institute-attestations.component';

describe('InstituteAttestationsComponent', () => {
  let component: InstituteAttestationsComponent;
  let fixture: ComponentFixture<InstituteAttestationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstituteAttestationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteAttestationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
