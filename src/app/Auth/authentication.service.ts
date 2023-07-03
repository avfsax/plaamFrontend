import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  interval as observableInterval,
  Unsubscribable as AnonymousSubscription,
  UnsubscriptionError,
} from 'rxjs';
import { Credential } from './credential';

export class AuthenticationServiceConfig {
  loginPath = 'api/login';
  defaultRoute = ['main'];
}

@Injectable()
export class AuthenticationService {
  private loginPath: string = '';
  private _isLogged = false;
  private interval: AnonymousSubscription;
  private token: string = '';
  private toRouteAfterLogin: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    @Optional() config: AuthenticationServiceConfig
  ) {
    if (config) {
      this.loginPath = config.loginPath;
      if (sessionStorage.getItem('auth_token')) {
        this._isLogged = true;
        let auth_token = sessionStorage.getItem('auth_token');
        if (auth_token) this.token = auth_token;
        this.setTokenCheckInterval();
      }
    }
    this.interval = observableInterval(1).subscribe(() => {});
  }

  private setTokenCheckInterval(): void {
    this.interval = observableInterval(10000).subscribe(() => {
      let token = sessionStorage.getItem('auth_token');
      if (!token) {
        this.logout(false);
      } else if (this.token != token) {
        location.reload();
      }
    });
  }

  private clearTokenCheckInterval(): void {
    if (this.interval) {
      this.interval.unsubscribe();
    }
  }

  authenticate(credentials: Credential): Promise<any> {
    return this.http
      .post(this.loginPath, {
        username: credentials.username,
        password: credentials.password,
      })
      .toPromise()
      .then((response: any) => this.successHandler(response))
      .catch((error) => this.errorHandler(error));
  }

  isLogged(): boolean {
    return this._isLogged;
  }

  private successHandler(response: LoginResponse) {
    this._isLogged = true;
    let data = response;
    let token = this.parseJwt(data.token);

    this.token = data.token;
    sessionStorage.setItem('auth_token', data.token);
    sessionStorage.setItem('user_id', data.user_id);

    this.setTokenCheckInterval();
    this.router.navigate(['']);

    return response;
  }

  private errorHandler(error: any): Promise<any> {
    console.log('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  parseJwt(token: string) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  logout(expiredSession: boolean): void {
    this.clearTokenCheckInterval();
    if (this._isLogged) {
      this._isLogged = false;
      this.token = '';
      this.toRouteAfterLogin = [];
      sessionStorage.removeItem('auth_token');
      sessionStorage.removeItem('user_id');
    }
    if (expiredSession) {
      this.toRouteAfterLogin = [this.router.url];
    }

    this.router.navigate([""]);
  }

  showLogin(commands: any[]): void {
    this.toRouteAfterLogin = commands;
    this.router.navigate(['login']);
  }

  getUserName(): string {
    return this.getTokenField('sub');
  }

  getUserID(): string {
    let user_id = sessionStorage.getItem('user_id');
    if (user_id) {
      return user_id;
    } else {
      return '';
    }
  }

  private getTokenField(fieldName: string): any {
    let raw = sessionStorage.getItem('auth_token');
    if (raw) {
      let token = this.parseJwt(raw);
      return token[fieldName];
    }
    return '';
  }

  getCurrentUser(): Promise<any> {
    let url = '/api/findUser/';
    return this.http
      .get(url)
      .toPromise()
      .catch((error) => this.errorHandler(error));
  }
}

interface LoginResponse {
  token: string;
  user_id: string;
}
