import { TestBed, inject } from '@angular/core/testing';

import { StudentregistrationService } from './studentregistration.service';

describe('StudentregistrationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentregistrationService]
    });
  });

  it('should be created', inject([StudentregistrationService], (service: StudentregistrationService) => {
    expect(service).toBeTruthy();
  }));
});
