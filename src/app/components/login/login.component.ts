import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isActive = false;
  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  get formControls(): any {
    return this.loginForm.controls;
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.authenticate(
        this.loginForm.get('username')?.value,
        this.loginForm.get('password')?.value
      );
    } else {
      this.messageService.add({
        severity: 'error',
        summary: this.translateService.instant("login.action.invalid_form"),
      
      });
    }
  }
}
