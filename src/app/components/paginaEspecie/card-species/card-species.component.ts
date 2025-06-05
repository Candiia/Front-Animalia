import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { SpeciesService } from '../../../services/species.service';
import { SpeciesLists, SpeciesListsResponse } from '../../../../models/species-list.interfaces';
import { Especie } from '../../../../models/pet-list.interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-card-species',
  templateUrl: './card-species.component.html',
  styleUrl: './card-species.component.css'
})
export class CardSpeciesComponent implements OnChanges, OnInit {
  modalRef: any;
  @Input() searchTerm: string = '';
  especiesFiltradas: Especie[] = [];
  constructor(private speciesService: SpeciesService, private modalService: NgbModal) { }
  espcieEnEdicion: Especie = { id: '00000000-0000-0000-0000-000000000000', nombre: '', localDate: '' };
  especies: SpeciesLists[] = [];
  page = 1;
  elementosEncontrados = 0;
  tamanioPagina = 20;
  @ViewChild('editBreedModal') editBreedModal!: TemplateRef<any>;
  @ViewChild('confirmDeleteModal') confirmDeleteModal!: TemplateRef<any>;
  especieEnEliminacion: Especie | null = null;

  ngOnInit(): void {
    this.obtenerListado();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm']) {
      this.filtrarEspecies();
    }
  }

  obtenerListado(): void {
    this.speciesService.obtenerListadoSpecies(this.page - 1).subscribe({
      next: (res: SpeciesListsResponse) => {
        this.especies = res.contenido;
        this.tamanioPagina = res.tamanioPagina;
        this.elementosEncontrados = res.elementosEncontrados;
        this.filtrarEspecies();
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


  abrirModalEdicion(especie: Especie) {
    this.espcieEnEdicion = { ...especie };
    this.modalRef = this.modalService.open(this.editBreedModal, { centered: true, backdrop: 'static' });
  }

  editarEspecie(modal: any) {
    this.speciesService.editEspecie(this.espcieEnEdicion.id, this.espcieEnEdicion.nombre).subscribe({
      next: () => {
        modal.close();
        this.obtenerListado();
      },
      error: err => {
        console.error('Error editando especie', err);
      }
    });
  }


  abrirModalDeEliminar(especie: Especie) {
    this.espcieEnEdicion = especie;
    this.modalRef = this.modalService.open(this.confirmDeleteModal, { centered: true, backdrop: 'static' });
  }

  confirmarEliminar(modal: any) {
    if (!this.especieEnEliminacion) return;

    this.speciesService.eliminarEspecie(this.especieEnEliminacion.id).subscribe({
      next: () => {
        modal.close();
        this.obtenerListado();
      },
      error: err => {
        console.error('Error eliminando especies', err);
      }
    });
  }

  filtrarEspecies(): void {
    const term = this.searchTerm.toLowerCase().trim();
    if (term === '') {
      this.especiesFiltradas = [...this.especies];
    } else {
      this.especiesFiltradas = this.especies.filter(e =>
        e.nombre.toLowerCase().includes(term)
      );

    }
  }

}
