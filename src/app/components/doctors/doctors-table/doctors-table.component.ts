import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from '../../model/user.model';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctors-table',
  templateUrl: './doctors-table.component.html',
  styleUrls: ['./doctors-table.component.css'],
})
export class DoctorsTableComponent implements OnInit {
  doctorList: User[] = [];
  constructor(
    private docService: DoctorService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private translateServ: TranslateService
  ) {}

  ngOnInit(): void {
    this.getDoctors();
  }

  modify() {}

  onDelete(userId: number) {
    this.confirmationService.confirm({
      message: 'Biztosan törölni szeretné az orvost?',
      accept: async () => {
        this.docService.delete(userId);

        this.messageService.add({
          severity: 'success',
          detail: this.translateServ.instant('User deleted')
        });
        this.getDoctors();
      },
    });
  }

  getDoctors() {
    this.doctorList = [];
    this.docService
      .getDoctorList()
      .subscribe((doctors) => (this.doctorList = doctors));
  }
}
