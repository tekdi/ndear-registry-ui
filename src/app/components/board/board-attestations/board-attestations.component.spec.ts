import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardAttestationsComponent } from './board-attestations.component';

describe('BoardAttestationsComponent', () => {
  let component: BoardAttestationsComponent;
  let fixture: ComponentFixture<BoardAttestationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardAttestationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardAttestationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
