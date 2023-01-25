import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomResponse } from 'src/app/interface/response';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly root = environment.rootPath;

  constructor(private http: HttpClient) {}

  checkUserInput(inputType: string, input: string): Observable<CustomResponse> {
    return this.http.get<CustomResponse>(
      this.root + `/user/check/${inputType}/${input}`
    );
  }
}
