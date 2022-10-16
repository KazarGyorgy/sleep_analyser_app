import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private apiURL: string = `${environment.api}/user`;
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  save(formData: any) {
    const path = `${this.apiURL}/patient`;
    this.http.post(path, formData).subscribe(
      () =>
        this.messageService.add({
          severity: 'info',
          summary: 'Sikeres mentés',
          detail: `A felhasználó mentve ${formData.firstName} ${formData.lastName}`,
        }),
      (err: any) =>
        this.messageService.add({
          severity: 'error',
          summary: 'Hiba a mentés során',
          detail: err,
        })
    );
  }

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiURL}/users/patient`);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`).subscribe();
  }
}
