import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DoctorService } from './doctor.service';
@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css'],
})
export class DoctorsComponent implements OnInit {
  registerForm!: FormGroup;

  public phoneNumberMask = [/\d/, /\d/, '-', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/,'-', /\d/, /\d/, /\d/]



  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private docService: DoctorService,
    private confirmationService: ConfirmationService
  ) {

  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      zip: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      streetAddress: new FormControl('', Validators.required),
      tajNumber: new FormControl(''),
      phoneNumber: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      birthdate: new FormControl('', Validators.required),
    });
  }

  onRegistration() {
    if (this.registerForm.status === 'VALID') {
      this.docService.saveDoctor(this.registerForm.value);
      this.registerForm.reset();
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Hiba a mentés során',
        detail: 'A mezőkk kitöltése fos',
        // this.translateService.instant("login.action.invalid_form"),
      });
    }
  }
}
