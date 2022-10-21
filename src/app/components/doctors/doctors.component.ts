import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { User } from '../model/user.model';
import { DoctorService } from './doctor.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css'],
})
export class DoctorsComponent implements OnInit {

  registerForm!: FormGroup;
  selectedDr?: User;
  tabIndex: number = 0;

  public phoneNumberMask = [
    '+',
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    '/',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {}

  onModifyDr(user: User) {
    this.selectedDr = user;
    this.tabIndex = 1;
    console.log(user);
  }

  refresh(refresh: boolean) {
    this.tabIndex = 0;
    this.doctorService.needToRefresh.next(true);
  }
}
