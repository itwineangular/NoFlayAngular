import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalInstituteComponent } from './educational-institute.component';

describe('EducationalInstituteComponent', () => {
  let component: EducationalInstituteComponent;
  let fixture: ComponentFixture<EducationalInstituteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationalInstituteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalInstituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
