import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ComentarioDtolist } from '../../models/detail-publication.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  eliminarComentario(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/comentario/admin/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    });
  }


  agregarComentario(publicacionId: string, texto: string): Observable<ComentarioDtolist> {
    const body = { texto };
    return this.http.post<ComentarioDtolist>(
      `${environment.apiBaseUrl}/comentario/publicacion/${publicacionId}`,
      body,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        }
      }
    );
  }

  editarComentario(id: string, body: { comentario: string }): Observable<ComentarioDtolist> {
    return this.http.put<ComentarioDtolist>(`${environment.apiBaseUrl}/comentario/admin/${id}`, body, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    });
  }

  editarComentarioUsuario(id: string, body: { comentario: string }): Observable<ComentarioDtolist> {
    return this.http.put<ComentarioDtolist>(`${environment.apiBaseUrl}/comentario/${id}`, body, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    });
  }

  eliminarComentarioUsuario(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/comentario/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    });
  }


}
