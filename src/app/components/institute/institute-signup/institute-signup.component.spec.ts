import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteSignupComponent } from './institute-signup.component';

describe('InstituteSignupComponent', () => {
  let component: InstituteSignupComponent;
  let fixture: ComponentFixture<InstituteSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstituteSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
