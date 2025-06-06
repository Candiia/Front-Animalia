  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  import { LikesList } from '../../models/likes-list.interfaces';
  import { environment } from '../../environments/environment';

  @Injectable({
    providedIn: 'root'
  })
  export class LikeService {

    constructor(private http: HttpClient) { }


    agregarLike(publicacionId: string): Observable<LikesList> {
      const body = { publicacionId };

      return this.http.post<LikesList>(
        `${environment.apiBaseUrl}/like`,
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
