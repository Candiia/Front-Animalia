import { Component, OnInit } from '@angular/core';
import { PublicacionPorMes } from '../../../../models/publicacion-por-mes.interfaces';
import { HomeService } from '../../../services/home.service';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController,
} from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BarController);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  chart: Chart | undefined;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.obtenerPublicacionPorMes().subscribe({
      next: (data: PublicacionPorMes[]) => {
        this.renderChart(data);
      },
      error: (err) => {
        console.error('Error al cargar datos del gráfico:', err);
      }
    });
  }

  renderChart(data: PublicacionPorMes[]) {
    const labels = data.map(item => this.formatearMes(item.mes));
    const values = data.map(item => item.cantidad);

    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = document.getElementById('publicacionesChart') as HTMLCanvasElement;

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Publicaciones por Mes',
          data: values,
          backgroundColor: values.map(v =>
            v < 15 ? 'rgba(87, 146, 223, 0.4)' : 'rgba(42, 157, 143, 0.4)'
          ),
          borderColor: values.map(v =>
            v < 15 ? 'rgba(87, 146, 223, 0.4)' : 'rgba(42, 157, 143, 0.4)'
          ),
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Publicaciones por Mes'
          }
        },
        scales: {
          x: {
            grid: {
              display: false, // Elimina las líneas de fondo en el eje X
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              display: false, // Elimina las líneas de fondo en el eje Y
            }
          }
        }
      }
    });
  }

  private formatearMes(isoMes: string): string {
    const [year, month] = isoMes.split('-').map(Number);
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return `${meses[month - 1]}`;
  }
}
