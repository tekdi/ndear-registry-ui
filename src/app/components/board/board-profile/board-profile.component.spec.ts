import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardProfileComponent } from './board-profile.component';

describe('BoardProfileComponent', () => {
  let component: BoardProfileComponent;
  let fixture: ComponentFixture<BoardProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
