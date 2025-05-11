import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstadisticasResponse } from '../../models/estadisticas-home.interfaces';
import { environment } from '../../environments/environment';
import { PublicacionPorMesResponse } from '../../models/publicacion-por-mes.interfaces';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }


  obtenerEstaditicass(): Observable<EstadisticasResponse> {
    return this.http.get<EstadisticasResponse>(`${environment.apiBaseUrl}/admin/estadisticas`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    });
  }

  obtenerPublicacionPorMes(): Observable<PublicacionPorMesResponse> {
    return this.http.get<PublicacionPorMesResponse>(`${environment.apiBaseUrl}/admin/estadisticas/publicaciones/por/mes`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    });
  }


}
