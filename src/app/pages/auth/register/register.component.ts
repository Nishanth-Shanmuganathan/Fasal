import { AuthService } from './../../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup
  showPassword: boolean;
  showConfirmPassword: boolean;

  error = {
    email: null,
    password: null,
    confirmPassword: null,
  }

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.showPassword = false
    this.showConfirmPassword = false
    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(12)]),
      confirmPassword: new FormControl(null, [Validators.required, this.confirmPassword.bind(this)])
    })

  }

  confirmPassword(formControl: FormControl) {
    if (this.registerForm && this.registerForm.value['password'] !== formControl.value) {
      return { mismatch: true }
    }
    return null
  }

  registerUser() {
    if (this.registerForm.invalid) {
      for (const key in this.registerForm.controls) {
        if (Object.prototype.hasOwnProperty.call(this.registerForm.controls, key)) {
          this.checkErrors(key)
        }
      }
      return;
    }
    this.authService.register(this.registerForm.value);


  }
  checkErrors(control: string) {
    if (this.registerForm.controls[control].invalid) {
      const formControl = this.registerForm.controls[control]
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
}
