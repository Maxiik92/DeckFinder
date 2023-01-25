import { Component } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { CustomResponse } from 'src/app/interface/response';
import { Register } from 'src/app/interface/register';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UserService } from 'src/app/service/user/user.service';
@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  attribute = 'password';
  nameUsed = false;
  submited = false;
  showPassword = false;
  emailUsed = false;
  noWhiteSpace = false;
  invalidEmail = false;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  onSubmit(form: NgForm) {
    this.nameUsed = false;
    this.emailUsed = false;
    const user: Register = {
      name: form.value.name,
      email: form.value.email,
      password: form.value.pass,
    };
    this.authService.register(user).subscribe({
      next: (res: Object) => {
        const data = res as CustomResponse;
        if (data.status == 400) {
          this.nameOrEmailUsed(data.message);
          return;
        }
        this.submited = true;
      },
      error: (e: Error) => {
        console.error(e);
      },
    });
  }

  nameOrEmailUsed(message: string) {
    switch (message) {
      case 'User name allready in use.':
        this.nameUsed = true;
        break;
      case 'User email allready in use.':
        this.emailUsed = true;
        break;
    }
    return;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.attribute = this.showPassword ? 'text' : 'password';
  }

  checkUserInput(event: Event) {
    this.noWhiteSpace = false;
    const inputType = (event.target as HTMLInputElement).id;
    const input = (event.target as HTMLInputElement).value;
    if (inputType == 'email') {
      if (!this.emailValidation(input)) {
        this.invalidEmail = true;
        return;
      }
    }
    this.hideInputTypeError(inputType);
    if (input == '') return;
    if (input.indexOf(' ') != -1) {
      this.noWhiteSpace = true;
      return;
    }
    this.userService.checkUserInput(inputType, input).subscribe({
      next: (data) => {
        console.log(data);
        if (data.status == 400) {
          this.nameOrEmailUsed(data.message);
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  hideInputTypeError(inputType: string) {
    switch (inputType) {
      case 'email':
        this.emailUsed = false;
        break;
      case 'name':
        this.nameUsed = false;
        break;
    }
    return;
  }

  emailValidation(email: string) {
    this.emailUsed = false;
    this.invalidEmail = false;
    const emailRegexp: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailRegexp.test(email)) {
      return true;
    }
    return false;
  }

  noErrorBeforeSubmit() {
    if (
      !this.noWhiteSpace &&
      !this.nameUsed &&
      !this.emailUsed &&
      !this.invalidEmail
    ) {
      return true;
    }
    return false;
  }
}
