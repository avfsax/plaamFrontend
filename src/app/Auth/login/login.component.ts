import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../authentication.service";
import { animate, keyframes, state, style, transition, trigger } from "@angular/animations";
import { Credential } from "../credential";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})

export class LoginComponent {
  title = 'webapp';

  credentials = {
    username: '',
    password: ''
  };

  isChrome = false;
  customization = '';
  shakeState = 'off';
  isBusy = false;
  invalidLogin = false;

  constructor( private router: Router, private loginService: AuthenticationService) {
    let browserWindow: any = window;
    this.isChrome = !!browserWindow.chrome;
  }

  ngOnInit() {
  }

  login(): void {
    let credential = new Credential(this.credentials.username, this.credentials.password);
    this.shakeState = 'off';
    this.isBusy = true;
    this.loginService.authenticate(credential)
      .then(response => {
        this.isBusy = false;
      })
      .catch(error => {
        this.isBusy = false;
        this.shakeState = 'on';
      });
  }

}
