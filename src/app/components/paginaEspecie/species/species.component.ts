import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Especie } from '../../../../models/pet-list.interfaces';
import { SpeciesService } from '../../../services/species.service';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrl: './species.component.css'
})
export class SpeciesComponent {

  mostrarToast = false;
  nuevaEspecie: { nombre: string } = { nombre: '' };
  @ViewChild('especieModal') especieModal!: TemplateRef<any>;
  mostrarError = false;
  searchTerm: string = '';

  constructor(private especieService: SpeciesService, private modalService: NgbModal) { }

  openModal() {
    this.modalService.open(this.especieModal, { centered: true });
  }

  addEspecie(modalRef: any) {
    if (!this.nuevaEspecie.nombre) return;

    this.especieService.addEspecie(this.nuevaEspecie.nombre).subscribe({
      next: (especie: Especie) => {
        this.nuevaEspecie.nombre = '';
        modalRef.close();
        this.mostrarToast = true;
        setTimeout(() => this.mostrarToast = false, 3000);
      },
      error: (error) => {
        console.error('Error al guardar la raza', error);

        if (error.status === 409) {
          this.mostrarError = true;
        } else {
          this.mostrarError = true;
        }

        setTimeout(() => this.mostrarError = false, 3000);

      }
    });
  }

}
