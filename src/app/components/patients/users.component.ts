import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from '../model/user.model';
import { PatientService } from './patient-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  patients: User[] = [];

  constructor(
    private patientsService: PatientService ,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private translateServ: TranslateService
  ) {}

  ngOnInit(): void {
    this.getPatients();
  }

  modify() {}

  onDelete(userId: number) {
    this.confirmationService.confirm({
      message: 'Biztosan törölni szeretné az orvost?',
      accept: async () => {
        this.patientsService.delete(userId);

        this.messageService.add({
          severity: 'success',
          detail: this.translateServ.instant('User deleted')
        });
        this.getPatients();
      },
    });
  }

  getPatients() {
    this.patients = [];
    this.patientsService
      .getUserList()
      .subscribe((patients) => (this.patients = patients));
  }
}
