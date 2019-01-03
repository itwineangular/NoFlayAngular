import { TestBed, inject } from '@angular/core/testing';

import { StudentmedicalrecordService } from './studentmedicalrecord.service';

describe('StudentmedicalrecordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentmedicalrecordService]
    });
  });

  it('should be created', inject([StudentmedicalrecordService], (service: StudentmedicalrecordService) => {
    expect(service).toBeTruthy();
  }));
});
