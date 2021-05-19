import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteProfileSelectComponent } from './institute-profile-select.component';

describe('InstituteProfileSelectComponent', () => {
  let component: InstituteProfileSelectComponent;
  let fixture: ComponentFixture<InstituteProfileSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstituteProfileSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteProfileSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
