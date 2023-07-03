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

  credentials = {
    username: '',
    password: ''
  };

  invalidLogin = false;

  constructor( private router: Router, private loginService: AuthenticationService) {
  }

  ngOnInit() {
  }

  login(): void {
    let credential = new Credential(this.credentials.username, this.credentials.password);
    this.loginService.authenticate(credential)
      .then(response => {
      })
      .catch(error => {
      });
  }

}
