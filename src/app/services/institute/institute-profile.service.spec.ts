import { TestBed } from '@angular/core/testing';

import { InstituteProfileService } from './institute-profile.service';

describe('InstituteProfileService', () => {
  let service: InstituteProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstituteProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
