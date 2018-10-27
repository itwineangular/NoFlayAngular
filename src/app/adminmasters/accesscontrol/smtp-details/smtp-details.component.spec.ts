import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmtpDetailsComponent } from './smtp-details.component';

describe('SmtpDetailsComponent', () => {
  let component: SmtpDetailsComponent;
  let fixture: ComponentFixture<SmtpDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmtpDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmtpDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
