import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomResponse, TokenResponse } from 'src/app/interface/response';
import { Register } from 'src/app/interface/register';
import { environment } from 'src/environments/environments';
import { Login } from 'src/app/interface/login';
import { JwtHelperService } from '@auth0/angular-jwt';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  private userName?: string;
  private userId?: string;
  private readonly root = environment.rootPath;

  constructor(private http: HttpClient) {}

  register(user: Register): Observable<CustomResponse> {
    return this.http.post<CustomResponse>(this.root + '/auth/create', user);
  }

  login(user: Login): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(this.root + '/auth/login', user);
  }

  saveUserNameAndId(token: string) {
    const decodedToken: { id: string; name: string } = decode(token);
    if (decodedToken) {
      this.userId = decodedToken.id;
      this.userName = decodedToken.name;
    }
  }

  get getUserName() {
    return this.userName;
  }

  get getUserId() {
    return this.userId;
  }

  isTokenExpired(): boolean {
    const token: string | null | undefined = localStorage.getItem('token');
    if (token == null) {
      return false;
    }
    if (this.jwtHelper.isTokenExpired(token)) {
      localStorage.removeItem('token');
    }
    return !this.jwtHelper.isTokenExpired(token);
  }
}
