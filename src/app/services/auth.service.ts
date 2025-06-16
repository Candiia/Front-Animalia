import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginResponse } from '../../models/login.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  loginUser(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/usuario/login`, {
      username: username,
      password: password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  activateAccount(token: string): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/usuario/activate/account/`, {
      token: token
    });
  }

  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  isAuthenticated(): boolean {
    if (!this.isBrowser()) {
      return false; 
    }
    return !!localStorage.getItem('token'); 
  }

  getUserRole(): string | null {
    return localStorage.getItem('roles');
  }
}
