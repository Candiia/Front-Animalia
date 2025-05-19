import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BreedsService } from '../../../services/breeds.service';
import bootstrap from 'bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Breed } from '../../../../models/breeds-list.interfaces';

@Component({
  selector: 'app-breeds',
  templateUrl: './breeds.component.html',
  styleUrl: './breeds.component.css'
})
export class BreedsComponent {

  mostrarToast = false;
  nuevaRaza: { nombre: string } = { nombre: '' };
  @ViewChild('breedModal') breedModal!: TemplateRef<any>;
  mostrarError = false;

  constructor(private breedsService: BreedsService, private modalService: NgbModal) { }

  openModal() {
    this.modalService.open(this.breedModal, { centered: true });
  }

  guardarRaza(modalRef: any) {
    if (!this.nuevaRaza.nombre) return;

    this.breedsService.addRaza(this.nuevaRaza.nombre).subscribe({
      next: (raza: Breed) => {
        this.nuevaRaza.nombre = '';
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
