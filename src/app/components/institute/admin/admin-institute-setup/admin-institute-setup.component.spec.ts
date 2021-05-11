import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInstituteSetupComponent } from './admin-institute-setup.component';

describe('AdminInstituteSetupComponent', () => {
  let component: AdminInstituteSetupComponent;
  let fixture: ComponentFixture<AdminInstituteSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminInstituteSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInstituteSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
