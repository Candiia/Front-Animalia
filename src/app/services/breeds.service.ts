import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Breed, BreedsListsResponse } from '../../models/breeds-list.interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BreedsService {

  constructor(private http: HttpClient) { }

  obtenerListadoBreeds(page: number): Observable<BreedsListsResponse> {
    return this.http.get<BreedsListsResponse>(`${environment.apiBaseUrl}/raza/?page=${page}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    });
  }

  obtenerListadoSinPaginar(): Observable<BreedsListsResponse> {
    return this.http.get<BreedsListsResponse>(`${environment.apiBaseUrl}/raza/todos`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    });
  }


  addRaza(nuevaRaza: string): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/raza`, {
      nombre: nuevaRaza
    },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        }
      }
    );
  }

  editRaza(id: string, nombre: string): Observable<any> {
    return this.http.put(`${environment.apiBaseUrl}/raza/${id}`,
      { nombre },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        }
      }
    );
  }


  eliminarRaza(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/raza/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    });
  }

}
