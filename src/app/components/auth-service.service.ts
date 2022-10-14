import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import jwt_decode from 'jwt-decode';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from '../services/token-storage.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private translateService: TranslateService,
    private messageService: MessageService,
    private tokenStorage: TokenStorageService
  ) {}

  authenticate(username: string, password: string) {
    const path = `${environment.api}/login?username=${username}&password=${password}`;
    this.http.post(path, {}).subscribe(
      (data: any) => {
        this.tokenStorage.saveToken(data.access_token);
        this.tokenStorage.saveRefreshToken(data.refresh_token);
        this.tokenStorage.saveUser(data);
        this.messageService.add({
          severity: 'success',
          summary: this.translateService.instant('login.action.successful'),
        });

        this.router.navigateByUrl('/home');
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: this.translateService.instant('login.action.error'),
        });
      }
    );
  }

  refreshToken(token: string) {
    console.log('authService Bearer ' + token);

    const path = `${environment.api}/role/refresh-token`;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(path, { headers: headers });
  }

  public get isLoggedIn(): boolean {
    const access_token = localStorage.getItem('access_token');
    return this.tokenIsNotExpired(access_token);
  }

  private tokenIsNotExpired(token: string | null): boolean {
    if (token) {
      const expireDate = this.getDecodedToken(token);

      return (
        token && expireDate && expireDate.exp * 1000 >= new Date().getTime()
      );
    }
    return false;
  }

  private getDecodedToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
  public logout() {
    return this.tokenStorage.signOut();
  }
}
