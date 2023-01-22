import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomResponse, TokenResponse } from 'src/app/interface/response';
import { Register } from 'src/app/interface/register';
import { environment } from 'src/environments/environments';
import { Login } from 'src/app/interface/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly root = environment.rootPath;

  constructor(private http: HttpClient) {}

  register(user: Register): Observable<CustomResponse> {
    return this.http.post<CustomResponse>(this.root + '/auth/create', user);
  }

  login(user: Login): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(this.root + '/auth/login', user);
  }
}
