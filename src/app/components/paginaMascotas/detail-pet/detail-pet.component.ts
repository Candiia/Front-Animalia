import { Component } from '@angular/core';
import { MascotaList, PetListsResponse } from '../../../../models/pet-list.interfaces';
import { ActivatedRoute } from '@angular/router';
import { PetService } from '../../../services/pet.service';
import { MascotaDtolist } from '../../../../models/user-list.interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PublicacionResponse } from '../../../../models/detail-publication.interfaces';
import { MascotaResponse } from '../../../../models/detail-mascota.interfaces';

@Component({
  selector: 'app-detail-pet',
  templateUrl: './detail-pet.component.html',
  styleUrl: './detail-pet.component.css'
})
export class DetailPetComponent {


  petId: string | null = null;
  petDetails: MascotaResponse | undefined;
  selectedPublicacion: PublicacionResponse | null = null;

  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.petId = this.route.snapshot.paramMap.get('id');

    if (this.petId) {
      this.petService.getPetById(this.petId).subscribe({
        next: (data) => {
          this.petDetails = data;
          console.log('Detalles de la mascota:', this.petDetails);
        },
        error: (err) => {
          console.error('Error al obtener los detalles de la mascota:', err);
        }
      });
    } else {
      console.error('No se encontró el ID de la mascota en la URL.');
    }
  }

  getImage(url: string | undefined | null): string {
    const prefix = 'http://localhost:8080/download/';
    if (!url) {
      return '';
    }
    if (url.startsWith(prefix) && url.includes('http', prefix.length)) {
      return url.substring(prefix.length);
    }
    if (!url.startsWith(prefix) && !url.startsWith('http')) {
      return prefix + url;
    }
    return url;
  }

}
