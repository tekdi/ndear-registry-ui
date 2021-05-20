import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardInstitutesComponent } from './board-institutes.component';

describe('BoardInstitutesComponent', () => {
  let component: BoardInstitutesComponent;
  let fixture: ComponentFixture<BoardInstitutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardInstitutesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardInstitutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
