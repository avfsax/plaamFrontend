import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { AuthenticationService } from 'src/app/Auth/authentication.service';
import { User } from 'src/app/Interfaces/user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less'],
})
export class MainComponent implements OnInit {
  user: User = { id: 0, email: '' };

  showmenu: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.readUser();
  }

  readUser() {
    this.authenticationService.getCurrentUser().then((response) => {
      this.user = response.user;
    });
  }

  logout(): void {
    this.user = { id: 0, email: '' };

    this.authenticationService.logout(true);
  }

  login(): void {
    this.router.navigate(['login']);
  }

  goToNews() {
    this.router.navigate(['news']);
  }
}
