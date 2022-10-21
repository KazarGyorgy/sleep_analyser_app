import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';

import { User } from '../../model/user.model';
import { PatientService } from '../patient-service.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
})
export class PatientListComponent implements OnInit {
  patientList: User[] = [];
  @Output() selectedPatient = new EventEmitter<User>();
  constructor(
    private patientService: PatientService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private translateServ: TranslateService
  ) {
    this.getPatient();
  }

  ngOnInit(): void {
    this.patientService.needToRefresh.subscribe((refresh: boolean) => {
      if (refresh.valueOf()) {
        this.getPatient();
        this.patientService.needToRefresh.next(false);
      }
    });
  }

  modify(patient: User) {
    this.selectedPatient.emit(patient);
  }

  onDelete(userId: number) {
    this.confirmationService.confirm({
      message: 'Biztosan törölni szeretné az orvost?',
      accept: () => {
        this.patientService.delete(userId).subscribe((res) => {
          console.log(res)
          if (res) {
            this.messageService.add({
              severity: 'success',
              detail: this.translateServ.instant('User deleted'),
            });
            this.patientService.needToRefresh.next(true);
          }
        });
      },
    });
  }

  getPatient() {
    this.patientList = [];
    this.patientService
      .getUserList()
      .subscribe((patients) => (this.patientList = patients));
  }
}
