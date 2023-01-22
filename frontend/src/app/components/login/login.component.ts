import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor(private authService: AuthService) {}
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.attribute = this.showPassword ? 'text' : 'password';
  }

  onSubmit(form: NgForm) {
    const login: Login = {
      login: form.value.login,
      password: form.value.pass,
    };
    console.log(login);
    //this.authService.login(login)
  }
}
