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
    return this.http.get<BreedsListsResponse>(`${environment.apiBaseUrl}/raza/admin?page=${page}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    });
  }


  guardarRaza(nuevaRaza: string): Observable<any> {
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
}
