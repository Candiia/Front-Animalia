import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { PetService } from '../../../services/pet.service';
import { MascotaList, PetListsResponse } from '../../../../models/pet-list.interfaces';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SpeciesService } from '../../../services/species.service';
import { BreedsService } from '../../../services/breeds.service';
import { Breed } from '../../../../models/breeds-list.interfaces';
import { SpeciesLists } from '../../../../models/species-list.interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-pet',
  templateUrl: './card-pet.component.html',
  styleUrl: './card-pet.component.css'
})
export class CardPetComponent implements OnChanges, OnInit {

  constructor(private petService: PetService, private modalService: NgbModal,
    private breedsService: BreedsService, private speciesService: SpeciesService, private router: Router) { }


  listaRazas: Breed[] = [];
  listaEspecies: SpeciesLists[] = [];
  mascotas: MascotaList[] = [];
  page = 1;
  @Input() searchTerm: string = '';
  mascotasFiltradas: MascotaList[] = [];
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
      username: '',
      id: '00000000-0000-0000-0000-000000000000',
    }
  };
  erroresFormulario: { [key: string]: string } = {};

  archivoAvatar: File | null = null;

  ngOnInit(): void {
    this.obtenerListado();
    this.cargarRazas();
    this.cargarEspecies();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm']) {
      this.filtrarMascotas();
    }
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
        const totalPages = Math.ceil(res.elementosEncontrados / res.tamanioPagina);

        if (this.page > totalPages && totalPages > 0) {
          this.page = totalPages;
          this.obtenerListado(); // volver a obtener ahora con la página corregida
          return;
        }

        this.mascotas = res.contenido;
        this.tamanioPagina = res.tamanioPagina;
        this.elementosEncontrados = res.elementosEncontrados;
        this.filtrarMascotas();
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

  getImage(url: string | undefined | null): string {
    if (!url) {
      return '';
    }

    if (url.startsWith('data:image/')) {
      return url;
    }

    const prefix = "http://localhost:8081/download/";

    if (url.startsWith(prefix) && url.includes("http", prefix.length)) {
      return url.substring(prefix.length);
    }
    if (!url.startsWith(prefix) && !url.startsWith("http")) {
      return prefix + url;
    }
    return url;
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
    const fechaNacimiento = new Date(this.petEnEdicion.fechaNacimiento);
    const hoy = new Date();

    fechaNacimiento.setHours(0, 0, 0, 0);
    hoy.setHours(0, 0, 0, 0);
    this.erroresFormulario = {};

    if (fechaNacimiento > hoy) {
      this.erroresFormulario['fechaNacimiento'] = 'La fecha de nacimiento no puede ser mayor que la fecha actual.';
      return;
    }

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
        this.erroresFormulario = {};

      },
      error: err => {
        console.error('Error editando mascota', err);
      }
    });
  }

  filtrarMascotas(): void {
    const term = this.searchTerm.toLowerCase().trim();
    if (term === '') {
      this.mascotasFiltradas = [...this.mascotas];
    } else {
      this.mascotasFiltradas = this.mascotas.filter(m =>
        m.nombre.toLowerCase().includes(term)
      );

    }
  }

  goToPetDetail(petId: string): void {
    this.router.navigate(['/detailPet', petId]);
  }
}
