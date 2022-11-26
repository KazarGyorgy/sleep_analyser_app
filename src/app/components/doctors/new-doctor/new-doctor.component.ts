import { DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastHelperService } from 'src/app/helpers/toast-helper';

import { User } from '../../../model/user.model';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-new-doctor',
  templateUrl: './new-doctor.component.html',
  styleUrls: ['./new-doctor.component.css'],
})
export class NewDoctorComponent implements OnInit {
  registerForm!: FormGroup;
  @Input() selectedDr?: User;
  @Output() needToRefresh = new EventEmitter();

  public phoneNumberMask = [
    '+',
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    '/',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private docService: DoctorService,
    private toastHelper: ToastHelperService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      zip: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      streetAddress: new FormControl('', Validators.required),
      drId: new FormControl(''),
      phoneNumber: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      birthdate: new FormControl('', Validators.required),
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedDr'].currentValue !== undefined) {
      const dr = changes['selectedDr'].currentValue;

      this.registerForm.setValue({
        firstName: dr.firstName,
        lastName: dr.lastName,
        zip: dr.zip,
        city: dr.city,
        streetAddress: dr.streetAddress,
        drId: dr.drId,
        phoneNumber: dr.phoneNumber,
        email: dr.email,
        birthdate: new Date('2022.01.01'),
      });
    }
  }

  onRegistration() {
    if (this.registerForm.status === 'VALID') {
      if (!this.selectedDr) {
        this.docService.saveDoctor(this.registerForm.value).subscribe(
          () => {
            this.toastHelper.successMessage(
              'Sikeres mentés',
              `A felhasználó mentvve ${
                this.registerForm.get('firstName')?.value
              } ${this.registerForm.get('lastName')?.value}`
            );

            this.registerForm.reset();
            this.needToRefresh.emit(true);
          },
          (err: any) => {
            this.toastHelper.errorMessage('Hiba a mentés során', '');
          }
        );
      } else {
        this.docService
          .updateDoctor(this.selectedDr.id, this.registerForm.value)
          .subscribe(
            () => {
              this.toastHelper.successMessage(
                'Sikeres mentés',
                `A felhasználó módosítása sikeres volt.`
              );
              this.registerForm.reset();
              this.needToRefresh.emit(true);
            },
            (err: any) => {
              this.toastHelper.errorMessage('Hiba a mentés során', '');
              this.selectedDr = undefined;
            }
          );
      }
    } else {
      this.toastHelper.errorMessage(
        'Hiba a mentés során',
        'A mezők kitöltése nem megfelelő'
      );
    }
  }
}
