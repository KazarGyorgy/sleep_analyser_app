import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastHelperService {
  constructor(private messageService: MessageService) {}

   successMessage(summary: string, detail: string) {
    this.messageService.add({
      severity: 'success',
      summary: summary,
      detail: detail,
    });
  }
  infoMessage(summary: string, detail: string) {
    this.messageService.add({
      severity: 'info',
      summary: summary,
      detail: detail,
    });
  }
  warningMessage(summary: string, detail: string) {
    this.messageService.add({
      severity: 'warning',
      summary: summary,
      detail: detail,
    });
  }
  errorMessage(summary: string, detail: string) {
    this.messageService.add({
      severity: 'error',
      summary: summary,
      detail: detail,
    });
  }
}
