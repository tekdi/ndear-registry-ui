import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardRolesComponent } from './board-roles.component';

describe('BoardRolesComponent', () => {
  let component: BoardRolesComponent;
  let fixture: ComponentFixture<BoardRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
