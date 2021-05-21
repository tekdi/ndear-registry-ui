import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentVerificationComponent } from './consent-verification.component';

describe('ConsentVerificationComponent', () => {
  let component: ConsentVerificationComponent;
  let fixture: ComponentFixture<ConsentVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsentVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsentVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
