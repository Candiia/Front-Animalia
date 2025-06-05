import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { BreedsService } from '../../../services/breeds.service';
import { Breed, BreedsListsResponse } from '../../../../models/breeds-list.interfaces';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-card-breeds',
  templateUrl: './card-breeds.component.html',
  styleUrl: './card-breeds.component.css'
})
export class CardBreedsComponent implements OnChanges, OnInit {

  constructor(private breedsService: BreedsService, private modalService: NgbModal) { }

  razaEnEdicion: Breed = { id: '00000000-0000-0000-0000-000000000000', nombre: '' };
  razas: Breed[] = [];
  @Input() searchTerm: string = '';
  razasFiltradas: Breed[] = [];
  page = 1;
  elementosEncontrados = 0;
  tamanioPagina = 20;
  @ViewChild('editBreedModal') editBreedModal!: TemplateRef<any>;
  @ViewChild('confirmDeleteModal') confirmDeleteModal!: TemplateRef<any>;
  razaEnEliminacion: Breed | null = null;
  private modalRef?: NgbModalRef;

  ngOnInit(): void {
    this.obtenerListado();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm']) {
      this.filtrarRazas();
    }
  }

  obtenerListado(): void {
    this.breedsService.obtenerListadoBreeds(this.page - 1).subscribe({
      next: (res: BreedsListsResponse) => {
        console.log(res.contenido);
        this.razas = res.contenido;
        this.tamanioPagina = res.tamanioPagina;
        this.elementosEncontrados = res.elementosEncontrados;
        this.filtrarRazas();
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

  abrirModalEdicion(raza: Breed) {
    this.razaEnEdicion = { ...raza };
    this.modalRef = this.modalService.open(this.editBreedModal, { centered: true, backdrop: 'static' });
  }

  editarRaza(modal: any) {
    this.breedsService.editRaza(this.razaEnEdicion.id, this.razaEnEdicion.nombre).subscribe({
      next: () => {
        modal.close();
        this.obtenerListado();
      },
      error: err => {
        console.error('Error editando raza', err);
      }
    });
  }


  abrirModalDeEliminar(raza: Breed) {
    this.razaEnEliminacion = raza;
    this.modalRef = this.modalService.open(this.confirmDeleteModal, { centered: true, backdrop: 'static' });
  }

  confirmarEliminar(modal: any) {
    if (!this.razaEnEliminacion) return;

    this.breedsService.eliminarRaza(this.razaEnEliminacion.id).subscribe({
      next: () => {
        modal.close();
        this.obtenerListado();
      },
      error: err => {
        console.error('Error eliminando raza', err);
      }
    });
  }

  filtrarRazas(): void {
    const term = this.searchTerm.toLowerCase().trim();
    if (term === '') {
      this.razasFiltradas = [...this.razas];
    } else {
      this.razasFiltradas = this.razas.filter(r =>
        r.nombre.toLowerCase().includes(term)
      );

    }
  }

}
