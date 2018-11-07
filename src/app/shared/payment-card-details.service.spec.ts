import { TestBed, inject } from '@angular/core/testing';

import { PaymentCardDetailsService } from './payment-card-details.service';

describe('PaymentCardDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentCardDetailsService]
    });
  });

  it('should be created', inject([PaymentCardDetailsService], (service: PaymentCardDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
