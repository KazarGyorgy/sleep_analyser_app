import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SleepingData } from '../model/sleeping-data.model';

@Injectable({
  providedIn: 'root',
})
export class SleepingDataService {
  apiURL = `${environment.api}/sleep-data/get`;

  constructor(private http: HttpClient) {}

  getSleepingData(userid: string, day: string) {
    return this.http.get<SleepingData[]>(`${this.apiURL}/${userid}/${day}`).toPromise();
  }
}
