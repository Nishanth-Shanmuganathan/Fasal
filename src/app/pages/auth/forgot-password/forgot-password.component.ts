import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UIService } from './../../../service/ui.service';
import { AuthService } from './../../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  password: string
  confirmPassword: string
  showPassword: boolean
  showConfirmPassword: boolean
  email: string
  constructor(
    private authService: AuthService,
    private uiService: UIService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.showPassword = false
    this.showConfirmPassword = false

    this.route.queryParams.pipe(take(1)).subscribe(query => {
      if (query['mail']) {
        this.email = query['mail']
        this.router.navigate([], {
          queryParams: {
            mail: null,
          },
          queryParamsHandling: 'merge'
        });
      } else {
        this.uiService.openNotification('Link invalid.. Please use the link sent to you...')
        this.router.navigate(['/', 'auth', 'login'])
      }
    });

  }

  resetPassword() {
    const err = this.checkErrors()
    if (err) {
      return this.uiService.openNotification(err)
    }
    this.authService.resetPassword({ email: this.email, password: this.password })
  }

  checkErrors() {
    if (!this.password) {
      return 'Password is required'
    }
    if (this.password.length < 8) {
      return 'Password should atleast have 8 characters'
    }
    if (this.password.length > 15) {
      return 'Password should atmost have 15 characters'
    }
    if (this.password !== this.confirmPassword) {
      return 'Passwords mismatch'
    }
  }
}
