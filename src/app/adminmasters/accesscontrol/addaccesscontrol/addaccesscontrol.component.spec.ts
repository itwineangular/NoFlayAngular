import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddaccesscontrolComponent } from './addaccesscontrol.component';

describe('AddaccesscontrolComponent', () => {
  let component: AddaccesscontrolComponent;
  let fixture: ComponentFixture<AddaccesscontrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddaccesscontrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddaccesscontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
