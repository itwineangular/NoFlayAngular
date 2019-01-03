import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentmedicalrecordComponent } from './studentmedicalrecord.component';

describe('StudentmedicalrecordComponent', () => {
  let component: StudentmedicalrecordComponent;
  let fixture: ComponentFixture<StudentmedicalrecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentmedicalrecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentmedicalrecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
