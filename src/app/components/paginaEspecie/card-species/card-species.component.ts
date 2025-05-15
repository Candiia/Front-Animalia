import { Component } from '@angular/core';
import { SpeciesService } from '../../../services/species.service';
import { SpeciesLists, SpeciesListsResponse } from '../../../../models/species-list.interfaces';

@Component({
  selector: 'app-card-species',
  templateUrl: './card-species.component.html',
  styleUrl: './card-species.component.css'
})
export class CardSpeciesComponent {

  constructor(private speciesService: SpeciesService) { }

  especies: SpeciesLists[] = [];
  page = 1;
  elementosEncontrados = 0;
  tamanioPagina = 20;


  ngOnInit(): void {
    this.obtenerListado();
  }

  obtenerListado(): void {
    this.speciesService.obtenerListadoSpecies(this.page - 1).subscribe({
      next: (res: SpeciesListsResponse) => {
        console.log(res.contenido);
        this.especies = res.contenido;
        this.tamanioPagina = res.tamanioPagina;
        this.elementosEncontrados = res.elementosEncontrados;

      },
      error: (err) => {
        console.error('Error al obtener el listado', err);
      }
    });
  }


  onPage(newPage: number): void {
    this.page = newPage;
    this.obtenerListado();
  }

}
