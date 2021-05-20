import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteConsentComponent } from './institute-consent.component';

describe('InstituteConsentComponent', () => {
  let component: InstituteConsentComponent;
  let fixture: ComponentFixture<InstituteConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstituteConsentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
