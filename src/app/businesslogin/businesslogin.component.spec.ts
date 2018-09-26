import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessloginComponent } from './businesslogin.component';

describe('BusinessloginComponent', () => {
  let component: BusinessloginComponent;
  let fixture: ComponentFixture<BusinessloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
