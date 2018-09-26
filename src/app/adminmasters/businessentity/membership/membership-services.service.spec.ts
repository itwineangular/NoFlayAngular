import { TestBed, inject } from '@angular/core/testing';

import { MembershipServicesService } from './membership-services.service';

describe('MembershipServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MembershipServicesService]
    });
  });

  it('should be created', inject([MembershipServicesService], (service: MembershipServicesService) => {
    expect(service).toBeTruthy();
  }));
});
