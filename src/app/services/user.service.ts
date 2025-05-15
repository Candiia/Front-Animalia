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
}
