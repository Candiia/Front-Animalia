import { Component, TemplateRef, ViewChild } from '@angular/core';
import { PetService } from '../../../services/pet.service';
import { MascotaList, PetListsResponse } from '../../../../models/pet-list.interfaces';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-card-pet',
  templateUrl: './card-pet.component.html',
  styleUrl: './card-pet.component.css'
})
export class CardPetComponent {

  constructor(private petService: PetService, private modalService: NgbModal) { }

  mascotas: MascotaList[] = [];
  page = 1;
  elementosEncontrados = 0;
  tamanioPagina = 3;
  mascotaEnEliminacion: MascotaList | null = null;
  @ViewChild('confirmDeleteModal', { static: true }) confirmarEliminarTemplate!: TemplateRef<any>;
  private modalRef?: NgbModalRef;

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

  abrirModalDeEliminar(mascota: MascotaList) {
    this.mascotaEnEliminacion = mascota;
    this.modalRef = this.modalService.open(this.confirmarEliminarTemplate, {
      centered: true,
      backdrop: 'static'
    });
  }


  confirmarEliminar(): void {
    if (!this.mascotaEnEliminacion || !this.modalRef) return;

    this.petService.eliminarPet(this.mascotaEnEliminacion.id).subscribe({
      next: () => {
        this.modalRef?.close();
        this.obtenerListado();
      },
      error: err => {
        console.error('Error eliminando a la mascota', err);
      }
    });
  }


}
