import { TestBed, inject } from '@angular/core/testing';

import { BrowseplansService } from './browseplans.service';

describe('BrowseplansService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrowseplansService]
    });
  });

  it('should be created', inject([BrowseplansService], (service: BrowseplansService) => {
    expect(service).toBeTruthy();
  }));
});
