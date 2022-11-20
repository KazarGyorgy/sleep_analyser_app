import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { ExtendedSleepingData } from 'src/app/model/sleeping-data.model';
import { SleepingDataService } from 'src/app/services/sleeping-data.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public hrChart: any;
  public bloodOxygenChart: any;
  public sleepingDataList!: ExtendedSleepingData;
  public selectedDate: Date = new Date();
  private user: any;
  @Input() selectedUserId?: number;

  form: FormGroup;
  constructor(
    private service: SleepingDataService,
    private builder: FormBuilder,
    private tokenStorage: TokenStorageService
  ) {
    this.user = tokenStorage.getUserDetails();

    this.form = this.builder.group({
      date: new FormControl(new Date(), Validators.required),
    });
    this.form.get('date')?.valueChanges.subscribe(() => {
      if (this.hrChart) this.hrChart.destroy();
      if (this.bloodOxygenChart) this.bloodOxygenChart.destroy();
      this.createChart();
    });

    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.createChart();
  }

  async getSleepingData() {
    const day = new Date(this.form.get('date')?.value)
      .toISOString()
      .split('T')[0];

    this.sleepingDataList = await this.service
      .getSleepingData(
        this.selectedUserId ? this.selectedUserId : this.user.userId,
        day
      )
      .then();
  }

  async createChart() {
    await this.getSleepingData();
    this.hrChart = new Chart('hr', {
      type: 'line', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: this.sleepingDataList.sleepingData.map((data) => {
          const date = new Date(data.dateTimeOfMeasurement);
          return (
            date.getHours().toString().padStart(2, '0') +
            ':' +
            date.getMinutes().toString().padStart(2, '0')
          );
        }),
        datasets: [
          {
            label: 'pulzus',
            data: this.sleepingDataList.sleepingData.map((data) => data.hr),
            backgroundColor: 'limegreen',
          },
          {
            label: '3ma',
            data: this.sleepingDataList.sleepingData.map((data) => data.ma3),
            backgroundColor: 'blue',
          },
          {
            label: '5ma',
            data: this.sleepingDataList.sleepingData.map((data) => data.ma5),
            backgroundColor: 'yellow',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          y: {
            min: 40,
            max: 100,
          },
        },
      },
    });
    this.bloodOxygenChart = new Chart('oxygen', {
      type: 'line', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: this.sleepingDataList.sleepingData.map((data) => {
          const date = new Date(data.dateTimeOfMeasurement);
          return (
            date.getHours().toString().padStart(2, '0') +
            ':' +
            date.getMinutes().toString().padStart(2, '0')
          );
        }),
        datasets: [
          {
            label: 'vér oxigén szint',
            data: this.sleepingDataList.sleepingData.map(
              (data) => data.bloodOxygen
            ),
            backgroundColor: 'purple',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          y: {
            min: 90,
            max: 100,
          },
        },
      },
    });
  }

  increaseDate() {
    const date = this.form?.get('date')?.value;
    date.setDate(date.getDate() + 1);
    this.form.controls['date'].patchValue(date);
  }

  decreaseDate() {
    const date = this.form?.get('date')?.value;
    date.setDate(date.getDate() - 1);
    this.form.controls['date'].patchValue(date);
  }
}
