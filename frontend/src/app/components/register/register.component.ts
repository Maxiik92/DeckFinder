import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomResponse } from 'src/app/interface/custom-response';
import { Register } from 'src/app/interface/register';
import { AuthService } from 'src/app/service/auth/auth.service';
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

  constructor(private authService: AuthService) {}

  onSubmit(form: NgForm) {
    this.nameUsed = false;
    const user: Register = {
      name: form.value.name,
      email: form.value.email,
      password: form.value.pass,
    };
    this.authService.register(user).subscribe({
      next: (res: Object) => {
        const data = res as CustomResponse;
        if (data.status == 400) {
          this.nameUsed = true;
          return;
        }
        this.submited = true;
      },
      error: (e: Error) => {
        console.error(e);
      },
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.attribute = this.showPassword ? 'text' : 'password';
  }
}
