import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastHelperService } from 'src/app/helpers/toast-helper';
import { User } from '../../../model/user.model';
import { PatientService } from '../patient-service.service';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.css'],
})
export class NewPatientComponent implements OnInit {
  registerForm!: FormGroup;
  @Input() selectedPatient?: User;

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
  public zipMask = [/\d/, /\d/, /\d/, /\d/];
  public tajMask = [
    /\d/,
    /\d/,
    /\d/,
    '-',
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

    private patientService: PatientService,
    private toastHelper: ToastHelperService
  ) {}

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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedPatient'].currentValue !== undefined) {
      const patient = changes['selectedPatient'].currentValue;
      console.log(patient);
      this.registerForm.setValue({
        firstName: patient.firstName,
        lastName: patient.lastName,
        zip: patient.zip,
        city: patient.city,
        streetAddress: patient.streetAddress,
        tajNumber: patient.tajNumber,
        phoneNumber: patient.phoneNumber,
        email: patient.email,
        birthdate: new Date(patient.birthdate),
      });
    }
  }

  onRegistration() {
    if (this.registerForm.status === 'VALID') {
      if (!this.selectedPatient) {
        this.patientService.save(this.registerForm.value);
        this.registerForm.reset();
      } else {
        this.patientService
          .update(this.selectedPatient.id, this.registerForm.value)
          .subscribe(
            () => {
              this.toastHelper.successMessage(
                'Sikeres mentés',
                `A felhasználó módosítása sikeres volt.`
              );
              this.registerForm.reset();
              this.patientService.needToRefresh.next(true);
              this.patientService.activeTabIndex.next(0);
            },
            (err: any) => {
              this.toastHelper.errorMessage('Hiba a mentés során', '');
            }
          );
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Hiba a mentés során',
        detail: '',
        // this.translateService.instant("login.action.invalid_form"),
      });
    }
  }
}
