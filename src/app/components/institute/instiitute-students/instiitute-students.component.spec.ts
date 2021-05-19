import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstiituteStudentsComponent } from './instiitute-students.component';

describe('InstiituteStudentsComponent', () => {
  let component: InstiituteStudentsComponent;
  let fixture: ComponentFixture<InstiituteStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstiituteStudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstiituteStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
