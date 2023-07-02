import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  Injector,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Router } from "@angular/router";
import { interval } from "rxjs";
import { AuthenticationService } from './Auth/authentication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit, OnDestroy {
  userName: string = "";
  user_id: string | undefined;

  isAdmin: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {

    this.reloadUser();
  }

  ngOnInit(): void {
    this.reloadUser();
  }

  reloadUser(){
    this.authenticationService.getCurrentUser().then(response => {
      this.isAdmin = response.admin;
      this.userName = response.user.name;
      sessionStorage.setItem("user_mac", response.user.plantMac);
      sessionStorage.setItem("user_plant", response.user.plantName);
    });
  }


  public ngOnDestroy(): void {
  }

  navigateToConfiguration() {
    this.router.navigate(['configuration']);
  }

  logout(): void {
    sessionStorage.setItem("user_mac", "");
    sessionStorage.setItem("user_plant", "");

    this.authenticationService.logout(false);
  }

}
