import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegstudentComponent } from './regstudent.component';

describe('RegstudentComponent', () => {
  let component: RegstudentComponent;
  let fixture: ComponentFixture<RegstudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegstudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegstudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
