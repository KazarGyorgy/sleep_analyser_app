import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TextMaskModule } from 'angular2-text-mask';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DividerModule } from 'primeng/divider';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { KnobModule } from 'primeng/knob';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { PasswordModule } from 'primeng/password';
import { RatingModule } from 'primeng/rating';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DoctorsTableComponent } from './components/doctors/doctors-table/doctors-table.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { NewDoctorComponent } from './components/doctors/new-doctor/new-doctor.component';
import { LoginComponent } from './components/login/login.component';
import { NewPatientComponent } from './components/patients/new-patient/new-patient.component';
import { PatientListComponent } from './components/patients/patient-list/patient-list.component';
import { PatientSleepDataComponent } from './components/patients/patient-sleep-data/patient-sleep-data.component';
import { UsersComponent } from './components/patients/users.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import {DialogModule} from 'primeng/dialog';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ToolbarComponent,
    UsersComponent,
    DoctorsComponent,
    DoctorsTableComponent,
    NewPatientComponent,
    PatientListComponent,
    NewDoctorComponent,
    ChangePasswordComponent,
    PatientSleepDataComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatCardModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    ToastModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MenubarModule,
    PasswordModule,
    DividerModule,
    CalendarModule,
    RatingModule,
    DialogModule,
    SplitButtonModule,
    MenuModule,
    CalendarModule,
    RatingModule,
    KnobModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    TabViewModule,
    TableModule,
    CardModule,
    ConfirmDialogModule,
    InputMaskModule,
    InputTextModule,
    TextMaskModule,
  ],
  providers: [
    ConfirmationService,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
