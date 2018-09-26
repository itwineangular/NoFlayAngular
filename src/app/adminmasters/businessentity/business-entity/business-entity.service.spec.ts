import { TestBed, inject } from '@angular/core/testing';

import { BusinessEntityService } from './business-entity.service';

describe('BusinessEntityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusinessEntityService]
    });
  });

  it('should be created', inject([BusinessEntityService], (service: BusinessEntityService) => {
    expect(service).toBeTruthy();
  }));
});
