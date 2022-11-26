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

export interface WeeklySleepingData {
  dateOfMeasurement: Date;
  lengthOfSleep: number;
}

export interface WeeklyStats {
  averageSleepLengt: number;
  minimumSleepLengt: number;
  maximumSleepLengt: number;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public hrChart: any;
  public weeklyChart: any;
  public monthlyChart: any;
  public bloodOxygenChart: any;
  public sleepingDataList!: ExtendedSleepingData;
  public weeklySleepingDataList!: WeeklySleepingData[];
  public rating: number = 0;
  public ratingMessage: string = '';

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
      dateWeekRange: new FormControl(new Date(), Validators.required),
      dateMonthRange: new FormControl(new Date()),
    });
    this.form.get('date')?.valueChanges.subscribe(() => {
      if (this.hrChart) this.hrChart.destroy();
      if (this.bloodOxygenChart) this.bloodOxygenChart.destroy();
      this.createChart();
    });
    this.form.get('dateWeekRange')?.valueChanges.subscribe(() => {
      if (this.weeklyChart) this.weeklyChart.destroy();
      this.createWeeklyChart();
    });
    this.form.get('dateMonthRange')?.valueChanges.subscribe(() => {
      if (this.monthlyChart) this.monthlyChart.destroy();

      this.createMonthlyChart();
    });

    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.createChart();
    this.createWeeklyChart();
    this.createMonthlyChart();
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
  async getWeeklySleepingData() {
    const day = new Date(this.form.get('dateWeekRange')?.value)
      .toISOString()
      .split('T')[0];

    this.weeklySleepingDataList = await this.service
      .getWeeklySleepingData(
        this.selectedUserId ? this.selectedUserId : this.user.userId,
        day
      )
      .then();
  }
  async getMonthlySleepingData() {
    const day = new Date(this.form.get('dateMonthRange')?.value)
      .toISOString()
      .split('T')[0];

    this.weeklySleepingDataList = await this.service
      .getMonthlySleepingData(
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

  async createWeeklyChart() {
    await this.getWeeklySleepingData();
    this.weeklyChart = new Chart('weekly', {
      type: 'bar', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: this.weeklySleepingDataList.map((data) => {
          const date = new Date(data.dateOfMeasurement);
          return date.toISOString().split('T')[0];
        }),
        datasets: [
          {
            label: 'alvás hossza',
            data: this.weeklySleepingDataList.map((data) => data.lengthOfSleep),
            backgroundColor: this.weeklySleepingDataList.map((data) =>
              data.lengthOfSleep > 7
                ? 'limegreen'
                : data.lengthOfSleep > 6
                ? 'yellow'
                : 'red'
            ),
          },
        ],
      },
      options: {
        aspectRatio: 4.5,
        scales: {
          y: {
            min: 0,
          },
        },
      },
    });
  }

  async createMonthlyChart() {
    await this.getMonthlySleepingData();
    this.monthlyChart = new Chart('monthly', {
      type: 'bar', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: this.weeklySleepingDataList.map((data) => {
          const date = new Date(data.dateOfMeasurement);
          return date.toISOString().split('T')[0];
        }),
        datasets: [
          {
            label: 'alvás hossza',
            data: this.weeklySleepingDataList.map((data) => data.lengthOfSleep),
            backgroundColor: this.weeklySleepingDataList.map((data) =>
              data.lengthOfSleep > 7
                ? 'limegreen'
                : data.lengthOfSleep > 6
                ? 'yellow'
                : 'red'
            ),
          },
        ],
      },
      options: {
        aspectRatio: 4.5,
        scales: {
          y: {
            min: 0,
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
  increaseWeek() {
    const date = this.form?.get('dateWeekRange')?.value;
    date.setDate(date.getDate() + 7);
    this.form.controls['dateWeekRange'].patchValue(date);
  }

  decreaseWeek() {
    const date = this.form?.get('dateWeekRange')?.value;
    date.setDate(date.getDate() - 7);
    this.form.controls['dateWeekRange'].patchValue(date);
  }
  increaseMonth() {
    const date = this.form?.get('dateMonthRange')?.value;
    date.setDate(date.getDate() + 30);
    this.form.controls['dateMonthRange'].patchValue(date);
  }

  decreaseMonth() {
    const date = this.form?.get('dateMonthRange')?.value;
    date.setDate(date.getDate() - 30);
    this.form.controls['dateMonthRange'].patchValue(date);
  }

  saveDisable(): boolean {
    return this.rating === 0;
  }
  saveRating() {
    this.service
      .saveRating(
        this.rating,
        this.ratingMessage,
        this.form?.get('date')?.value
      )
      .subscribe();
  }
}
