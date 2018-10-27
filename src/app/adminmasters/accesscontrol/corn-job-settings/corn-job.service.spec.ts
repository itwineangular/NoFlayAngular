import { TestBed, inject } from '@angular/core/testing';

import { CornJobService } from './corn-job.service';

describe('CornJobService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CornJobService]
    });
  });

  it('should be created', inject([CornJobService], (service: CornJobService) => {
    expect(service).toBeTruthy();
  }));
});
