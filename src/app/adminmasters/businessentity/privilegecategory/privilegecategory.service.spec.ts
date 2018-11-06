import { TestBed, inject } from '@angular/core/testing';

import { PrivilegecategoryService } from './privilegecategory.service';

describe('PrivilegecategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrivilegecategoryService]
    });
  });

  it('should be created', inject([PrivilegecategoryService], (service: PrivilegecategoryService) => {
    expect(service).toBeTruthy();
  }));
});
