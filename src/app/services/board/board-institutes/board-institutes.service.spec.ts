import { TestBed } from '@angular/core/testing';

import { BoardInstituteService } from './board-institutes.service';

describe('BoardInstituteService', () => {
  let service: BoardInstituteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardInstituteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
