import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder, FormGroup
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { User } from '../model/user.model';
import { DoctorService } from './doctor.service';
import { DoctorsTableComponent } from './doctors-table/doctors-table.component';
@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css'],
})
export class DoctorsComponent implements OnInit {
  @ViewChild(DoctorsTableComponent) child!: DoctorsTableComponent;
  registerForm!: FormGroup;
  selectedDr?: User;
  tabIndex:number =0;
  needToRefresh : Subject<boolean>= new Subject();

  public phoneNumberMask = [
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    '/',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
  ];

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private docService: DoctorService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {}

  onModifyDr(user: User) {
    this.selectedDr = user;
    this.tabIndex = 1;
    console.log(user);
  }

  refresh(refresh: boolean) {
    console.log("mentés után parent")
    console.log(refresh);

this.needToRefresh.next(refresh);
     this.tabIndex=0;

  }

}
