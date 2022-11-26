import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private apiURL: string = `${environment.api}/user`;
  public needToRefresh: Subject<boolean> = new Subject<boolean>();
  public activeTabIndex: Subject<number> = new Subject<number>();

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private translateService: TranslateService
  ) {
    this.needToRefresh.next(true);
    this.activeTabIndex.next(0);
  }

  save(formData: any) {
    const path = `${this.apiURL}/patient`;
    this.http.post(path, formData).subscribe(
      () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Sikeres mentés',
          detail: `A felhasználó mentve ${formData.firstName} ${formData.lastName}`,
        });
        this.needToRefresh.next(true);
        this.activeTabIndex.next(0);
      },
      (err: any) =>
        this.messageService.add({
          severity: 'error',
          summary: 'Hiba a mentés során',
          detail: err,
        })
    );
  }

  update(userId: number, formData: any): Observable<any> {
    return this.http.patch(`${this.apiURL}/${userId}`, formData);
  }
  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiURL}/users/patient`);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiURL}/${id}`);
  }
}
