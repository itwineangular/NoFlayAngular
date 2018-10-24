import { TestBed, inject } from '@angular/core/testing';

import { EmailTemplateServicesService } from './email-template-services.service';

describe('EmailTemplateServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmailTemplateServicesService]
    });
  });

  it('should be created', inject([EmailTemplateServicesService], (service: EmailTemplateServicesService) => {
    expect(service).toBeTruthy();
  }));
});
