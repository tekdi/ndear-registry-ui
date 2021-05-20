import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentLoginComponent } from './consent-login.component';

describe('ConsentLoginComponent', () => {
  let component: ConsentLoginComponent;
  let fixture: ComponentFixture<ConsentLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsentLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsentLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
