import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { UserListsResponse } from '../../../models/user-list.interfaces';
import { LoginResponse } from '../../../models/login.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  loginUser(username: string, password: string): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/usuario/login/admin`, {
      username: username,
      password: password
    }, {
      headers: {
        'Content-Type': 'application/json',        
      }
    })
  }
}
