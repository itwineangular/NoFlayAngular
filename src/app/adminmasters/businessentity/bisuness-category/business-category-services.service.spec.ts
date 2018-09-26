import { TestBed, inject } from '@angular/core/testing';

import { BusinessCategoryServicesService } from './business-category-services.service';

describe('BusinessCategoryServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusinessCategoryServicesService]
    });
  });

  it('should be created', inject([BusinessCategoryServicesService], (service: BusinessCategoryServicesService) => {
    expect(service).toBeTruthy();
  }));
});
