import { Router } from '@angular/router';
import { UIService } from './ui.service';
import { NotificationComponent } from './../components/notification/notification.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment.prod';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string = localStorage.getItem('token');
  tokenSubj = new Subject<string>()

  constructor(
    private http: HttpClient,
    private uiService: UIService,
    private route: Router
  ) { }

  register(registerCred) {
    this.http.post<{ message: string }>(environment.server + 'auth/register', registerCred)
      .subscribe(res => {
        this.uiService.openNotification(res?.message)
        this.route.navigate(['/'])
      }, err => {
        this.uiService.openNotification(err.error.message || null)

      })
  }

  login(loginCred) {
    this.http.post<{ message: string }>(environment.server + 'auth/login', loginCred)
      .subscribe(res => {

        this.uiService.openNotification(res?.message)
        this.route.navigate(['/'])
      }, err => {
        console.log(err);

        this.uiService.openNotification(err.error?.message || null)
      })
  }

  forgotPassword(mailid) {
    this.http.get<{ message: string }>(environment.server + 'auth/forget-password/' + mailid)
      .subscribe(res => {
        this.uiService.openNotification(res?.message)
      }, err => {
        this.uiService.openNotification(err.error.message || null)
      })
  }

  resetPassword(data: {
    email: string,
    password: string
  }) {
    this.http.post<{ message: string }>(environment.server + 'auth/reset-password', data)
      .subscribe(res => {
        this.uiService.openNotification(res?.message)
        this.route.navigate(['/', 'auth', 'login'])
      }, err => {
        this.uiService.openNotification(err.error.message || null)
      })
  }

  logout() {
    this.http.get<{ message: string }>(environment.server + 'auth/logout')
      .subscribe(res => {
        this.uiService.openNotification(res?.message)
      }, err => {
        this.uiService.openNotification(err.error.message || null)
        console.log(err);

      }, () => {
        localStorage.removeItem('token')
        this.token = null
        this.tokenSubj.next(this.token)
        this.route.navigate(['/', 'auth', 'login'])
      })

  }
}
