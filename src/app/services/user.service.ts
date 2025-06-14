import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserList, UserListsResponse } from '../../models/user-list.interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserDetailResponse } from '../../models/detail-user.interfaces';

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

  addAdmin(username: string, password: string, verifyPassword: string, email: string): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/usuario/register/admin`, {
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

  getUserById(id: string): Observable<UserDetailResponse> {
    return this.http.get<UserDetailResponse>(`${environment.apiBaseUrl}/usuario/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    });
  }

  getUsuarioLogueado(): Observable<UserDetailResponse> {
    return this.http.get<UserDetailResponse>(`${environment.apiBaseUrl}/usuario/loggeado`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    });
  }

  eliminarMiCuenta(): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/usuario`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    });
  }

editarUsuarioLogueado(email: string, password: string, verifyPassword: string): Observable<any> {
  return this.http.put(`${environment.apiBaseUrl}/usuario/me`,
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
