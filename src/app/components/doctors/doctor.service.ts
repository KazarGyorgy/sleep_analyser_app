import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private apiURL: string = `${environment.api}/user`;
  needToRefresh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  saveDoctor(formData: any): Observable<any> {
    const path = `${this.apiURL}/doctor`;
    return this.http.post(path, formData);
  }

  getDoctorList(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiURL}/users/doctor`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/${id}`);
  }

  updateDoctor(id: number, formData: any): Observable<any> {
    return this.http.patch<User>(`${this.apiURL}/${id}`, formData);
  }
}
