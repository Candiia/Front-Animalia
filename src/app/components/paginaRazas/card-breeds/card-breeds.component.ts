import { Component } from '@angular/core';
import { BreedsService } from '../../../services/breeds.service';
import { Breed, BreedsListsResponse } from '../../../../models/breeds-list.interfaces';

@Component({
  selector: 'app-card-breeds',
  templateUrl: './card-breeds.component.html',
  styleUrl: './card-breeds.component.css'
})
export class CardBreedsComponent {

  constructor(private breedsService: BreedsService) { }

  razas: Breed[] = [];
  page = 1;
  elementosEncontrados = 0;
  tamanioPagina = 20;


  ngOnInit(): void {
    this.obtenerListado();
  }

  obtenerListado(): void {
    this.breedsService.obtenerListadoBreeds(this.page - 1).subscribe({
      next: (res: BreedsListsResponse) => {
        console.log(res.contenido);
        this.razas = res.contenido;
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
