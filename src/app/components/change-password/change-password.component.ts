import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ChangePasswordService } from './change-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  public passwordForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private changePasswordService: ChangePasswordService
  ) {
    this.passwordForm = this.formBuilder.group(
      {
        oldPassword: new FormControl('', [Validators.required]),
        newPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: [''],
      },
      { validators: this.checkPasswords }
    );
    this.passwordForm.markAsTouched();
  }

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    const pass = group?.get('newPassword')?.value;
    const confirmPass = group?.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  };

  public get f(): any {
    return this.passwordForm;
  }

  onChange() {
    if (!this.passwordForm.invalid) {
      this.changePasswordService.update(this.passwordForm.value);
    }
  }
}
