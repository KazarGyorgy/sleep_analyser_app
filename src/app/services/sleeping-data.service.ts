import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WeeklySleepingData } from '../components/dashboard/dashboard.component';
import { SleepingData } from '../model/sleeping-data.model';

@Injectable({
  providedIn: 'root',
})
export class SleepingDataService {
  apiURL = `${environment.api}/sleep-data/get`;
  postApiUrl = `${environment.api}/sleep-data`;

  constructor(private http: HttpClient) {}

  getSleepingData(userid: string, day: string) {
    return this.http.get<SleepingData[]>(`${this.apiURL}/${userid}/${day}`).toPromise();
  }

  getWeeklySleepingData(userid: string, day: string) {
    return this.http.get<WeeklySleepingData[]>(`${this.apiURL}/weekly/${userid}/${day}`).toPromise();
  }

  getMonthlySleepingData(userid: string, day: string) {
    return this.http.get<WeeklySleepingData[]>(`${this.apiURL}/monthly/${userid}/${day}`).toPromise();
  }

  saveRating(rating:number, ratingMessage: string, date: Date){
    return this.http.post(this.postApiUrl,{rating, ratingMessage, date});
  }
}
