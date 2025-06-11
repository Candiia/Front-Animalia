import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PublicacionResponse } from '../../models/detail-publication.interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor(private http: HttpClient) { }

  obtenerPublicacionPorId(id: string): Observable<PublicacionResponse> {
    return this.http.get<PublicacionResponse>(`${environment.apiBaseUrl}/publicacion/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }

  eliminarPublicacion(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/publicacion/admin/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }

  createPublicacion(data: { descripcion: string }, file: File | null, mascotaId: string) {
    const url = `${environment.apiBaseUrl}/publicacion/${mascotaId}`;
    const formData = new FormData();

    const jsonBlob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    formData.append('post', jsonBlob);

    if (file) {
      formData.append('file', file, file.name);
    }

    return this.http.post(url, formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
  }
}
