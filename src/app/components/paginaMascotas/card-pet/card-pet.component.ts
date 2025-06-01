import { Component, TemplateRef, ViewChild } from '@angular/core';
import { PetService } from '../../../services/pet.service';
import { MascotaList, PetListsResponse } from '../../../../models/pet-list.interfaces';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SpeciesService } from '../../../services/species.service';
import { BreedsService } from '../../../services/breeds.service';
import { Breed } from '../../../../models/breeds-list.interfaces';
import { SpeciesLists } from '../../../../models/species-list.interfaces';

@Component({
  selector: 'app-card-pet',
  templateUrl: './card-pet.component.html',
  styleUrl: './card-pet.component.css'
})
export class CardPetComponent {

  constructor(private petService: PetService, private modalService: NgbModal,
    private breedsService: BreedsService, private speciesService: SpeciesService,) { }


  listaRazas: Breed[] = [];
  listaEspecies: SpeciesLists[] = [];
  mascotas: MascotaList[] = [];
  page = 1;
  elementosEncontrados = 0;
  tamanioPagina = 3;
  mascotaEnEliminacion: MascotaList | null = null;
  @ViewChild('confirmDeleteModal', { static: true }) confirmarEliminarTemplate!: TemplateRef<any>;
  @ViewChild('editPetModal') editPetModal!: TemplateRef<any>;
  private modalRef?: NgbModalRef;
  petEnEdicion: MascotaList = {
    id: '00000000-0000-0000-0000-000000000000',
    nombre: '',
    biografia: '',
    fechaNacimiento: '',
    avatar: '',
    raza: {
      id: '00000000-0000-0000-0000-000000000000',
      nombre: ''
    },
    especie: {
      id: '00000000-0000-0000-0000-000000000000',
      nombre: '',
      localDate: ''
    },
    userDTO: {
      username: '00000000-0000-0000-0000-000000000000'
    }
  };

  archivoAvatar: File | null = null;

  ngOnInit(): void {
    this.obtenerListado();
    this.cargarRazas();
    this.cargarEspecies();
  }

  cargarRazas(): void {
    this.breedsService.obtenerListadoBreeds(0).subscribe({
      next: res => {
        this.listaRazas = res.contenido;
      },
      error: err => {
        console.error('Error cargando razas', err);
      }
    });
  }

  cargarEspecies(): void {
    this.speciesService.obtenerListadoSpecies(0).subscribe({
      next: res => {
        this.listaEspecies = res.contenido;
      },
      error: err => {
        console.error('Error cargando especies', err);
      }
    });
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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.archivoAvatar = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.petEnEdicion.avatar = reader.result as string;
      };
      reader.readAsDataURL(this.archivoAvatar);
    }
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

  abrirModalEdicion(mascota: MascotaList) {
    this.petEnEdicion = { ...mascota };
    this.modalRef = this.modalService.open(this.editPetModal, { centered: true, backdrop: 'static' });
  }

  editarMascota(modal: any) {
    const postData: any = {
      nombre: this.petEnEdicion.nombre,
      fechaNacimiento: this.petEnEdicion.fechaNacimiento,
      biografia: this.petEnEdicion.biografia,
      razaId: this.petEnEdicion.raza.id,
      especieId: this.petEnEdicion.especie.id,
    };
    if (!this.archivoAvatar) {
      postData.avatar = this.petEnEdicion.avatar;
    }
    this.petService.editPet(this.petEnEdicion.id, postData, this.archivoAvatar).subscribe({
      next: () => {
        modal.close();
        this.obtenerListado();
        this.archivoAvatar = null;
      },
      error: err => {
        console.error('Error editando mascota', err);
      }
    });
  }

}
