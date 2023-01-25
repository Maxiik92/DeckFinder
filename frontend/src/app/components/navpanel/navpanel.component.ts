import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'navpanel',
  templateUrl: './navpanel.component.html',
  styleUrls: ['./navpanel.component.css'],
})
export class NavpanelComponent implements OnInit {
  loggedIn?: boolean;
  userName?: string;
  userId?: string;
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.checkIfSomeoneIsLoggedIn();
  }

  checkIfSomeoneIsLoggedIn() {
    this.authService.saveUserNameAndId();
    const name = this.authService.getUserName;
    const id = this.authService.getUserId;
    console.log(name, id);
    if (!name && !id) {
      this.loggedIn = false;
      return;
    }
    this.loggedIn = true;
    this.setUserNameAndId();
  }

  setUserNameAndId() {
    this.userName = this.authService.getUserName;
    this.userId = this.authService.getUserId;
  }

  logOut() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.router.navigate(['']);
    window.location.reload();
  }
}
