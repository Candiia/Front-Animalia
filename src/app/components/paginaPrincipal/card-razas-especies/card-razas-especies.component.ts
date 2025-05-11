import { Component } from '@angular/core';
import { HomeService } from '../../../services/home.service';
import { EstadisticasResponse } from '../../../../models/estadisticas-home.interfaces';

@Component({
  selector: 'app-card-razas-especies',
  templateUrl: './card-razas-especies.component.html',
  styleUrl: './card-razas-especies.component.css'
})
export class CardRazasEspeciesComponent {


  totalRazas: number = 0;
  totalEspecies: number = 0;


  constructor(private homeService: HomeService) { }


  ngOnInit(): void {
    this.obtenerEstadisticas();
  }

  obtenerEstadisticas(): void {
    this.homeService.obtenerEstaditicass().subscribe({
      next: (res: EstadisticasResponse) => {
        console.log('Respuesta de estadísticas:', res);
        this.totalEspecies = res.numEspecies;
        this.totalRazas = res.numRazas;
      },
      error: (err) => {
        console.error('Error al obtener estadísticas:', err);
      }
    });
  }

}
