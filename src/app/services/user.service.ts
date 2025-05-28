import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserListsResponse } from '../../models/user-list.interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  obtenerListadoUser(page: number): Observable<UserListsResponse> {
    return this.http.get<UserListsResponse>(`${environment.apiBaseUrl}/usuario/admin?page=${page}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    });
  }


  eliminarUser(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/usuario/admin/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    });
  }

  addUser(username: string, password: string, verifyPassword: string, email: string): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/usuario/register`, {
      username,
      password,
      verifyPassword,
      email
    },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        }
      }
    );
  }


  editUser(id: string, email: string, password: string, verifyPassword: string,): Observable<any> {
    return this.http.put(`${environment.apiBaseUrl}/usuario/${id}`,
      {
        email,
        password,
        verifyPassword
      },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        }
      }
    );
  }
}
