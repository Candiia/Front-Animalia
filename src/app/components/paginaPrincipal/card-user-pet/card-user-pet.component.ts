import { Component } from '@angular/core';
import { HomeService } from '../../../services/home.service';
import { EstadisticasResponse } from '../../../../models/estadisticas-home.interfaces';

@Component({
  selector: 'app-card-user-pet',
  templateUrl: './card-user-pet.component.html',
  styleUrls: ['./card-user-pet.component.css']
})
export class CardUserPetComponent {

  totalUsuarios: number = 0;
  totalMascotas: number = 0;
  

  constructor(private homeService: HomeService) { }


  ngOnInit(): void {
    this.obtenerEstadisticas();
  }

  obtenerEstadisticas(): void {
    this.homeService.obtenerEstaditicass().subscribe({
      next: (res: EstadisticasResponse) => {
        console.log('Respuesta de estadísticas:', res);
        this.totalUsuarios = res.numUser;
        this.totalMascotas = res.numMascotas;
      },
      error: (err) => {
        console.error('Error al obtener estadísticas:', err);
      }
    });
  }

}
