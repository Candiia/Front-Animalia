import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PetListsResponse } from '../../models/pet-list.interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(private http: HttpClient) { }

  obtenerListadoMascotas(page: number): Observable<PetListsResponse> {
    return this.http.get<PetListsResponse>(`${environment.apiBaseUrl}/mascota/admin?page=${page}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    });
  }

  eliminarPet(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/mascota/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    });
  }

}
