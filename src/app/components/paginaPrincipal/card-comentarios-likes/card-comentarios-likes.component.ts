import { Component } from '@angular/core';
import { HomeService } from '../../../services/home.service';
import { EstadisticasResponse } from '../../../../models/estadisticas-home.interfaces';

@Component({
  selector: 'app-card-comentarios-likes',
  templateUrl: './card-comentarios-likes.component.html',
  styleUrl: './card-comentarios-likes.component.css'
})
export class CardComentariosLikesComponent {

  totalComentarios: number = 0;
  totalLikes: number = 0;


  constructor(private homeService: HomeService) { }


  ngOnInit(): void {
    this.obtenerEstadisticas();
  }

  obtenerEstadisticas(): void {
    this.homeService.obtenerEstaditicass().subscribe({
      next: (res: EstadisticasResponse) => {
        console.log('Respuesta de estadísticas:', res);
        this.totalComentarios = res.numComentarios;
        this.totalLikes = res.numLikes;
      },
      error: (err) => {
        console.error('Error al obtener estadísticas:', err);
      }
    });
  }
}
