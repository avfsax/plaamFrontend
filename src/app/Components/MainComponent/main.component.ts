import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { AuthenticationService } from 'src/app/Auth/authentication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  userName: string = '';
  user_id: string | undefined;

  isAdmin: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.reloadUser();
  }

  ngOnInit(): void {
    this.reloadUser();
  }

  reloadUser() {
    this.authenticationService.getCurrentUser().then((response) => {
      this.userName = response.user.name;
    });
  }

  logout(): void {
    this.authenticationService.logout(false);
  }
}
