import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSleepDataComponent } from './patient-sleep-data.component';

describe('PatientSleepDataComponent', () => {
  let component: PatientSleepDataComponent;
  let fixture: ComponentFixture<PatientSleepDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientSleepDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientSleepDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
