import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'sleep-analyser-app';
  showNavbar$: Observable<boolean>;

  constructor(private translate: TranslateService, private tokenService: TokenStorageService) {
    translate.setDefaultLang('hu');
    translate.use('hu');
    this.showNavbar$ = this.tokenService.showNavBar.asObservable();
  }
}
