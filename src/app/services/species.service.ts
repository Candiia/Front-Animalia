import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpeciesListsResponse } from '../../models/species-list.interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {

  constructor(private http: HttpClient) { }

  obtenerListadoSpecies(page: number): Observable<SpeciesListsResponse> {
    return this.http.get<SpeciesListsResponse>(`${environment.apiBaseUrl}/especie/admin?page=${page}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    });
  }

  addEspecie(nuevaEspecie: string): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/especie`, {
      nombre: nuevaEspecie
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
