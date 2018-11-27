import { TestBed, inject } from '@angular/core/testing';

import { StudentloginService } from './studentlogin.service';

describe('StudentloginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentloginService]
    });
  });

  it('should be created', inject([StudentloginService], (service: StudentloginService) => {
    expect(service).toBeTruthy();
  }));
});
