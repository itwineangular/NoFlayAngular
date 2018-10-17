import { TestBed, inject } from '@angular/core/testing';

import { MembershipCardService } from './membership-card.service';

describe('MembershipCardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MembershipCardService]
    });
  });

  it('should be created', inject([MembershipCardService], (service: MembershipCardService) => {
    expect(service).toBeTruthy();
  }));
});
