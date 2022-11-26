import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastHelperService } from 'src/app/helpers/toast-helper';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordService {
  private readonly apiUrl: string = environment.api;

  constructor(private http: HttpClient, private toast: ToastHelperService) {}
  update(formData: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) {
    return this.http
      .patch<any>(`${this.apiUrl}/user/change-password`, {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      })
      .subscribe((res) => {
        if (res) {
          this.toast.successMessage(
            'Jelszó változtatás',
            'Jelszavát sikeresen megváltoztatta'
          );
        } else {
          this.toast.errorMessage(
            'Hibás jelszó változtatás',
            'A megadott jelenlegi jelszó hibás, kérem próbálja újra!'
          );
        }
      });
  }
}
