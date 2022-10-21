import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/patients/users.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', canActivate: [AuthGuard], component: DashboardComponent },
  { path: 'users', canActivate: [AuthGuard], component: UsersComponent },
  { path: 'doctors', canActivate: [AuthGuard], component: DoctorsComponent },
  { path: 'change-password', canActivate: [AuthGuard], component: ChangePasswordComponent },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
