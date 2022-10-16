import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from '../../model/user.model';
import { DoctorService } from '../doctor.service';
import { Output, EventEmitter } from '@angular/core';
import { Subject, timeout } from 'rxjs';

@Component({
  selector: 'app-doctors-table',
  templateUrl: './doctors-table.component.html',
  styleUrls: ['./doctors-table.component.css'],
})
export class DoctorsTableComponent implements OnInit {
  doctorList: User[] = [];
  @Output() selectedUser = new EventEmitter<User>();
  @Output() refreshed = new EventEmitter();
  @Input() needToRefresh!: Subject<boolean> ;

  constructor(
    private docService: DoctorService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private translateServ: TranslateService
  ) {}

  ngOnInit(): void {
    this.getDoctors();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.needToRefresh)
    if(changes['needToRefresh'].currentValue == true) {
      console.log("itt vagok")
      this.getDoctors();
    }

    this.refreshed.emit(true);

  }

  modify(user: User) {
    this.selectedUser.emit(user);
  }

  onDelete(userId: number) {
    this.confirmationService.confirm({
      message: 'Biztosan törölni szeretné az orvost?',
      accept: async () => {
        this.docService.delete(userId);

        this.messageService.add({
          severity: 'success',
          detail: this.translateServ.instant('User deleted'),
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
