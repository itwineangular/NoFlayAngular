import { TestBed, inject } from '@angular/core/testing';

import { ContractTemplateService } from './contract-template.service';

describe('ContractTemplateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContractTemplateService]
    });
  });

  it('should be created', inject([ContractTemplateService], (service: ContractTemplateService) => {
    expect(service).toBeTruthy();
  }));
});
