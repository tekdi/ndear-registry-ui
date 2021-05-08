import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteProfileSetupComponent } from './institute-profile-setup.component';

describe('InstituteProfileSetupComponent', () => {
  let component: InstituteProfileSetupComponent;
  let fixture: ComponentFixture<InstituteProfileSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstituteProfileSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteProfileSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
