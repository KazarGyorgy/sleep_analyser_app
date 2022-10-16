import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from '../../model/user.model';
import { PatientService } from '../patient-service.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  patientList: User[] = [];
  constructor(
    private patientService: PatientService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private translateServ: TranslateService
  ) {}

  ngOnInit(): void {
    this.getPatient();
  }

  modify(patient: User) {}

  onDelete(userId: number) {
    this.confirmationService.confirm({
      message: 'Biztosan törölni szeretné az orvost?',
      accept: async () => {
       this.patientService.delete(userId).subscribe(()=> this.getPatient());

        this.messageService.add({
          severity: 'success',
          detail: this.translateServ.instant('User deleted')
        });
        this.getPatient();
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
