import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-sleep-data',
  templateUrl: './patient-sleep-data.component.html',
  styleUrls: ['./patient-sleep-data.component.css']
})
export class PatientSleepDataComponent implements OnInit {

  @Input() selectedUserId?: number;
  constructor() { }

  ngOnInit(): void {
  }

}
