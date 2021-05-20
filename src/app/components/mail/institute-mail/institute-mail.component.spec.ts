import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteMailComponent } from './institute-mail.component';

describe('InstituteMailComponent', () => {
  let component: InstituteMailComponent;
  let fixture: ComponentFixture<InstituteMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstituteMailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
