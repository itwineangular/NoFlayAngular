import { TestBed, inject } from '@angular/core/testing';

import { CourseCategoryService } from './course-category.service';

describe('CourseCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseCategoryService]
    });
  });

  it('should be created', inject([CourseCategoryService], (service: CourseCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
