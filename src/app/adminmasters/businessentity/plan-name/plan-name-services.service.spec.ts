import { TestBed, inject } from '@angular/core/testing';

import { PlanNameServicesService } from './plan-name-services.service';

describe('PlanNameServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlanNameServicesService]
    });
  });

  it('should be created', inject([PlanNameServicesService], (service: PlanNameServicesService) => {
    expect(service).toBeTruthy();
  }));
});
