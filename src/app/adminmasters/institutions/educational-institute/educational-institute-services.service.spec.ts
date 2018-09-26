import { TestBed, inject } from '@angular/core/testing';

import { EducationalInstituteServicesService } from './educational-institute-services.service';

describe('EducationalInstituteServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EducationalInstituteServicesService]
    });
  });

  it('should be created', inject([EducationalInstituteServicesService], (service: EducationalInstituteServicesService) => {
    expect(service).toBeTruthy();
  }));
});
