import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivilegecategoryComponent } from './privilegecategory.component';

describe('PrivilegecategoryComponent', () => {
  let component: PrivilegecategoryComponent;
  let fixture: ComponentFixture<PrivilegecategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivilegecategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivilegecategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
