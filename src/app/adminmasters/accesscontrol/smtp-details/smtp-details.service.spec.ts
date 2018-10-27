import { TestBed, inject } from '@angular/core/testing';

import { SmtpDetailsService } from './smtp-details.service';

describe('SmtpDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmtpDetailsService]
    });
  });

  it('should be created', inject([SmtpDetailsService], (service: SmtpDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
