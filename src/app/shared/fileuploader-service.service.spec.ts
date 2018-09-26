import { TestBed, inject } from '@angular/core/testing';

import { FileuploaderServiceService } from './fileuploader-service.service';

describe('FileuploaderServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileuploaderServiceService]
    });
  });

  it('should be created', inject([FileuploaderServiceService], (service: FileuploaderServiceService) => {
    expect(service).toBeTruthy();
  }));
});
