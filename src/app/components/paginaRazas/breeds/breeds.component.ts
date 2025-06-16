import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BreedsService } from '../../../services/breeds.service';
import bootstrap from 'bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Breed } from '../../../../models/breeds-list.interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-breeds',
  templateUrl: './breeds.component.html',
  styleUrl: './breeds.component.css'
})
export class BreedsComponent {

  mostrarToast = false;
  nuevaRaza: { nombre: string } = { nombre: '' };
  @ViewChild('breedModal') breedModal!: TemplateRef<any>;
  breedForm!: FormGroup;
  mostrarError = false;
  razaYaExiste = false;
  searchTerm: string = '';

  constructor(private fb: FormBuilder, private breedsService: BreedsService, private modalService: NgbModal) {
    this.breedForm = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  openModal() {
    this.razaYaExiste = false;
    this.breedForm.reset();
    this.modalService.open(this.breedModal, { centered: true });
  }
  guardarRaza(modalRef: any) {
    if (this.breedForm.invalid) return;

    const nombreRaza = this.breedForm.value.nombre;

    this.breedsService.addRaza(nombreRaza).subscribe({
      next: (raza: Breed) => {
        this.breedForm.reset();
        modalRef.close();
        this.mostrarToast = true;
        setTimeout(() => this.mostrarToast = false, 3000);
      },
      error: (error) => {
        if (error.status === 409) {
          this.razaYaExiste = true;
          this.breedForm.get('nombre')?.setErrors({ taken: true });
        } else {
          this.mostrarError = true;
          setTimeout(() => this.mostrarError = false, 3000);
        }
      }
    });
  }


}
