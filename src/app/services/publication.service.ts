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
}
