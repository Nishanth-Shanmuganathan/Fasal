import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpErrorResponse,
  HttpEvent
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from 'rxjs/operators'

import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = localStorage.getItem('token');
    const authRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + authToken)
    });
    return next.handle(authRequest)
      .pipe(
        tap((event: HttpEvent<any>) => {
          // console.log(error);

          if (event instanceof HttpResponse) {
            if (event.body['token'] && this.authService.token !== event.body['token']) {
              this.authService.token = event.body['token']
              this.authService.tokenSubj.next(event.body['token'])
              localStorage.setItem('token', event.body['token'])
            }
          }
          return event
        })

      )
  }
}
