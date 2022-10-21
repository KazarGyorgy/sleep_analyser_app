import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from '../model/user.model';
import { PatientService } from './patient-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  patients: User[] = [];
  tabIndex: number = 0;
  selectedPatient?: User;

  constructor(
    private patientsService: PatientService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private translateServ: TranslateService
  ) {
    this.patientsService.activeTabIndex.subscribe(
      (index) => (this.tabIndex = index)
    );
  }

  ngOnInit(): void {}

  onModifyPatient(patient: User) {
    this.tabIndex =1;
    this.selectedPatient = patient;
  }
}
