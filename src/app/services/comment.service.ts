import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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


  agregarComentario(publicacionId: string, texto: string): Observable<any> {
    const body = { texto };
    return this.http.post<any>(
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

}
