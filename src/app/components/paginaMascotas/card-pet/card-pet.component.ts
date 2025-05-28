import { Component } from '@angular/core';
import { PetService } from '../../../services/pet.service';
import { MascotaList, PetListsResponse } from '../../../../models/pet-list.interfaces';

@Component({
  selector: 'app-card-pet',
  templateUrl: './card-pet.component.html',
  styleUrl: './card-pet.component.css'
})
export class CardPetComponent {

  constructor(private petService: PetService) { }

  mascotas: MascotaList[] = [];
  page = 1;
  elementosEncontrados = 0;
  tamanioPagina = 3;


  ngOnInit(): void {
    this.obtenerListado();
  }

  obtenerListado(): void {
    this.petService.obtenerListadoMascotas(this.page - 1).subscribe({
      next: (res: PetListsResponse) => {
        console.log(res.contenido);
        this.mascotas = res.contenido;
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

  getAvatarUrl(mascota: MascotaList): string {
    if (mascota.avatar) {
      return mascota.avatar;
    } else {
      return "http://localhost:8080/download/" + mascota.avatar;
    }
  }


}
