import { TestBed, inject } from '@angular/core/testing';

import { StudentDetailsService } from './student-details.service';

describe('StudentDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentDetailsService]
    });
  });

  it('should be created', inject([StudentDetailsService], (service: StudentDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
