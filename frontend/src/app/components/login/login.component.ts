import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/interface/login';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  attribute = 'password';
  showPassword = false;
  invalidLogin = false;
  invalidPassword = false;

  constructor(private authService: AuthService, private router: Router) {}
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.attribute = this.showPassword ? 'text' : 'password';
  }

  onSubmit(form: NgForm) {
    this.resetInvalidInputs();
    const login: Login = {
      login: form.value.login,
      password: form.value.pass,
    };
    this.authService.login(login).subscribe({
      next: (data) => {
        if (data.status != 200) {
          switch (data.message) {
            case 'User Name/ Email not found.':
              this.invalidLogin = !this.invalidLogin;
              break;
            case 'Invalid Password':
              this.invalidPassword = !this.invalidPassword;
              break;
          }
          return;
        }
        localStorage.setItem('token', data.token);
        this.authService.saveUserNameAndId(data.token);
        this.router.navigate(['']);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  resetInvalidInputs() {
    this.invalidLogin = false;
    this.invalidPassword = false;
  }
}
