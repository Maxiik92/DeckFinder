import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from 'src/app/interface/register';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly root = environment.rootPath;

  constructor(private http: HttpClient) {}

  register(user: Register) {
    return this.http.post(this.root + '/auth/create', user);
  }
}
