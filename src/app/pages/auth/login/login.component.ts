import { AuthService } from './../../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  showPassword: boolean;

  error = {
    email: null,
    password: null
  }

  constructor(
    private authService: AuthService

  ) { }

  ngOnInit(): void {
    this.showPassword = false
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(12)])
    })

  }

  confirmPassword(formControl: FormControl) {
    if (this.loginForm && this.loginForm.value['password'] !== formControl.value) {
      return { mismatch: true }
    }
    return null
  }

  registerUser() {
    if (this.loginForm.invalid) {
      for (const key in this.loginForm.controls) {
        if (Object.prototype.hasOwnProperty.call(this.loginForm.controls, key)) {
          this.checkErrors(key)
        }
      }
      return;
    }
    this.authService.login(this.loginForm.value);


  }
  checkErrors(control: string) {
    if (this.loginForm.controls[control].invalid) {
      const formControl = this.loginForm.controls[control]
      if (formControl.errors.email) {
        this.error[control] = 'Invalid e-mail address'
      }
      if (formControl.errors['minlength']) {
        this.error[control] = 'Password should atleast have 8 characters'
      }
      if (formControl.errors['maxlength']) {
        this.error[control] = 'Password should atmost have 12 characters'
      }
      if (formControl.errors.mismatch) {
        this.error[control] = 'Passwords mismatch'
      }
      if (formControl.errors.required) {
        this.error[control] = 'This field is required'
      }

    } else {
      this.error[control] = null
    }
  }

  resetPassword() {
    const mail = this.loginForm.value['email']
    if (!mail) {
      this.error = {
        email: null,
        password: null
      }
      return this.error['email'] = 'Enter the mail address to reset the password'
    }
    this.authService.forgotPassword(mail)
  }
}
