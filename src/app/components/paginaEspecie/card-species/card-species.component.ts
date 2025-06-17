import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { SpeciesService } from '../../../services/species.service';
import { SpeciesLists, SpeciesListsResponse } from '../../../../models/species-list.interfaces';
import { Especie } from '../../../../models/pet-list.interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-card-species',
  templateUrl: './card-species.component.html',
  styleUrl: './card-species.component.css'
})
export class CardSpeciesComponent implements OnChanges, OnInit {
  modalRef: any;
  @Input() searchTerm: string = '';
  especiesFiltradas: Especie[] = [];
  constructor(private speciesService: SpeciesService, private modalService: NgbModal, private fb: FormBuilder) { }
  espcieEnEdicion: Especie = { id: '00000000-0000-0000-0000-000000000000', nombre: '', localDate: '' };
  especies: SpeciesLists[] = [];
  page = 1;
  elementosEncontrados = 0;
  tamanioPagina = 20;
  @ViewChild('editBreedModal') editBreedModal!: TemplateRef<any>;
  @ViewChild('confirmDeleteModal') confirmDeleteModal!: TemplateRef<any>;
  especieEnEliminacion: SpeciesLists | null = null;
  speciesEditForm!: FormGroup;
  mostrarToast: boolean = false;
  mensajeToast: string = '';
  toastTipo: 'success' | 'error' = 'success';

  ngOnInit(): void {
    this.obtenerListado();
    this.speciesEditForm = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm']) {
      this.filtrarEspecies();
    }
  }

  mostrarMensaje(mensaje: string, tipo: 'success' | 'error' = 'success') {
    this.mensajeToast = mensaje;
    this.toastTipo = tipo;
    this.mostrarToast = true;
    setTimeout(() => {
      this.mostrarToast = false;
    }, 3000);
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
    this.speciesEditForm.reset();
    this.speciesEditForm.patchValue({
      nombre: this.espcieEnEdicion.nombre
    });
    this.modalRef = this.modalService.open(this.editBreedModal, { centered: true, backdrop: 'static' });
  }

  editarEspecie(modal: any) {
    if (this.speciesEditForm.invalid) {
      this.speciesEditForm.markAllAsTouched();
      return;
    }

    const nombre = this.speciesEditForm.value.nombre.trim().toLowerCase();

    const existe = this.especies.some(r => r.nombre.toLowerCase() === nombre && r.id !== this.espcieEnEdicion.id);

    if (existe) {
      this.speciesEditForm.get('nombre')?.setErrors({ taken: true });
      return;
    }

    this.speciesService.editEspecie(this.espcieEnEdicion.id, this.speciesEditForm.value.nombre).subscribe({
      next: () => {
        modal.close();
        this.obtenerListado();
        this.mostrarMensaje('Especie editada correctamente.', 'success');
      },
      error: err => {
        modal.close();
        console.error('Error editando especie', err);
        this.mostrarMensaje('Ocurrió un error al editar la especie.', 'error');
      }
    });
  }

  abrirModalDeEliminar(especie: Especie) {
    this.especieEnEliminacion = especie;
    this.modalRef = this.modalService.open(this.confirmDeleteModal, { centered: true, backdrop: 'static' });
  }


  confirmarEliminar(modal: any) {
    if (!this.especieEnEliminacion) return;

    this.speciesService.eliminarEspecie(this.especieEnEliminacion.id).subscribe({
      next: () => {
        modal.close();
        this.obtenerListado();
        this.mostrarMensaje('Especie eliminada correctamente.', 'success');
      },
      error: err => {
        modal.close();
        if (err.status === 409 && err.error?.detail?.includes('mascotas asociadas')) {
          this.mostrarMensaje('No se puede eliminar esta especie porque tiene mascotas asociadas.', 'error');
        } else {
          console.error('Error eliminando especie', err);
          this.mostrarMensaje('Ocurrió un error al eliminar la especie.', 'error');
        }
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
