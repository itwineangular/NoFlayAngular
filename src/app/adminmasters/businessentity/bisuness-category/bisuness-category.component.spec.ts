import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BisunessCategoryComponent } from './bisuness-category.component';

describe('BisunessCategoryComponent', () => {
  let component: BisunessCategoryComponent;
  let fixture: ComponentFixture<BisunessCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BisunessCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BisunessCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
