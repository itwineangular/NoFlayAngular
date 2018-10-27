import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CornJobSettingsComponent } from './corn-job-settings.component';

describe('CornJobSettingsComponent', () => {
  let component: CornJobSettingsComponent;
  let fixture: ComponentFixture<CornJobSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CornJobSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CornJobSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
