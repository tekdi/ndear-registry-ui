import { TestBed } from '@angular/core/testing';

import { TeacherProfileService } from './teacher-profile.service';

describe('TeacherProfileService', () => {
  let service: TeacherProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
