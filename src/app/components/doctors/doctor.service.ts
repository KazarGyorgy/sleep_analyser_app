import { HttpClient } from '@angular/common/http';
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

  saveDoctor(formData: any) {
    const path = `${this.apiURL}/doctor`;
    this.http.post(path, formData).subscribe(
      () =>
        this.messageService.add({
          severity: 'info',
          summary: 'Sikeres mentés',
          detail: `A felhasználó mentvve ${formData.firstName} ${formData.lastName}`,
        }),
      (err: any) =>
        this.messageService.add({
          severity: 'error',
          summary: 'Hiba a mentés során',
          detail: err,
        })
    );
  }

  getDoctorList(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiURL}/users/doctor`);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`).subscribe();
  }

  updateDoctor(id: number, formData: any) {
    return this.http.patch<User>(`${this.apiURL}/${id}`,formData).subscribe(
      () =>
        this.messageService.add({
          severity: 'info',
          summary: 'Sikeres mentés',
          detail: `A felhasználó mentvve ${formData.firstName} ${formData.lastName}`,
        }),
      (err: any) =>{
      console.log(err),
        this.messageService.add({
          severity: 'error',
          summary: 'Hiba a mentés során',
          detail: err,
        })}
    );
  }
}
