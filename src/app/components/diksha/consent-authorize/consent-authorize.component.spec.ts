import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentAuthorizeComponent } from './consent-authorize.component';

describe('ConsentAuthorizeComponent', () => {
  let component: ConsentAuthorizeComponent;
  let fixture: ComponentFixture<ConsentAuthorizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsentAuthorizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsentAuthorizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
