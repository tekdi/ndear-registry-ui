import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardLoginComponent } from './board-login.component';

describe('BoardLoginComponent', () => {
  let component: BoardLoginComponent;
  let fixture: ComponentFixture<BoardLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
