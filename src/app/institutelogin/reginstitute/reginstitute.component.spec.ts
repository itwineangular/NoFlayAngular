import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReginstituteComponent } from './reginstitute.component';

describe('ReginstituteComponent', () => {
  let component: ReginstituteComponent;
  let fixture: ComponentFixture<ReginstituteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReginstituteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReginstituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
