import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private inj: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      sessionStorage.getItem('user_id') &&
      sessionStorage.getItem('auth_token')
    ) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + sessionStorage.getItem('auth_token'),
        },
      });
    }
    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              const authenticationService = this.inj.get(AuthenticationService);
              authenticationService.logout(
                sessionStorage.getItem('auth_token') ? true : false
              );
            }
          }
        }
      )
    );
  }
}
