import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PetListsResponse } from '../../models/pet-list.interfaces';
import { environment } from '../../environments/environment';
import e from 'express';

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


  editPet(id: string, petData: any, file: File | null): Observable<any> {
    const url = `${environment.apiBaseUrl}/mascota/admin/${id}`;
    const formData = new FormData();
    formData.append('post', new Blob([JSON.stringify(petData)], { type: 'application/json' }));
    if (file) {
      formData.append('file', file, file.name);
    } else {
      formData.append('file', new Blob([], { type: 'application/octet-stream' }), 'empty.txt');
    }
    return this.http.put(url, formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,

      }
    });
  }

  createPet(petData: any, file: File | null): Observable<any> {
    const url = `${environment.apiBaseUrl}/mascota/usuario`;
    const formData = new FormData();
    formData.append('post', new Blob([JSON.stringify(petData)], { type: 'application/json' }));
    if (file) {
      formData.append('file', file, file.name);
    }
    return this.http.post(url, formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
  }


}
