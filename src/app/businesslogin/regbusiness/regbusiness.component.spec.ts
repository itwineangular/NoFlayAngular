import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegbusinessComponent } from './regbusiness.component';

describe('RegbusinessComponent', () => {
  let component: RegbusinessComponent;
  let fixture: ComponentFixture<RegbusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegbusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegbusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
