import { TestBed, inject } from '@angular/core/testing';

import { StudentHomePageService } from './student-home-page.service';

describe('StudentHomePageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentHomePageService]
    });
  });

  it('should be created', inject([StudentHomePageService], (service: StudentHomePageService) => {
    expect(service).toBeTruthy();
  }));
});
