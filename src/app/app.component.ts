import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'sleep-analyser-app';

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('hu');
    translate.use('hu');
  }
}
