import { TestBed, inject } from '@angular/core/testing';

import { AdminlayService } from './adminlay.service';

describe('AdminlayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminlayService]
    });
  });

  it('should be created', inject([AdminlayService], (service: AdminlayService) => {
    expect(service).toBeTruthy();
  }));
});
