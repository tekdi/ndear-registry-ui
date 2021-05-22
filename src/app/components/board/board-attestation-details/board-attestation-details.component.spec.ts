import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardAttestationDetailsComponent } from './board-attestation-details.component';

describe('BoardAttestationDetailsComponent', () => {
  let component: BoardAttestationDetailsComponent;
  let fixture: ComponentFixture<BoardAttestationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardAttestationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardAttestationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
