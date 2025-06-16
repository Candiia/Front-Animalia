import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MascotaList, PetListsResponse } from '../../../../models/pet-list.interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { PetService } from '../../../services/pet.service';
import { MascotaDtolist } from '../../../../models/user-list.interfaces';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PublicacionResponse } from '../../../../models/detail-publication.interfaces';
import { MascotaResponse } from '../../../../models/detail-mascota.interfaces';
import { PublicationService } from '../../../services/publication.service';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { UserDetailResponse } from '../../../../models/detail-user.interfaces';
import { Breed } from '../../../../models/breeds-list.interfaces';
import { SpeciesLists } from '../../../../models/species-list.interfaces';
import { BreedsService } from '../../../services/breeds.service';
import { SpeciesService } from '../../../services/species.service';

@Component({
  selector: 'app-detail-pet',
  templateUrl: './detail-pet.component.html',
  styleUrl: './detail-pet.component.css'
})
export class DetailPetComponent {


  petId: string | null = null;
  petDetails: MascotaResponse | undefined;
  selectedPublicacion: PublicacionResponse | null = null;
  rolUsuario: string | null = null;
  nuevaPublicacionDescripcion: string = '';
  archivoPublicacion: File | null = null;
  mostrarError: boolean = false;
  mostrarToast: boolean = false;
  currentUserId: string | null = null;
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
  avatarFile: File | null = null;
  listaRazas: Breed[] = [];
  listaEspecies: SpeciesLists[] = [];
  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    private modalService: NgbModal,
    private publicationService: PublicationService,
    private userService: UserService,
    private router: Router,
    private razaService: BreedsService,
    private especieService: SpeciesService
  ) { }

  ngOnInit(): void {
    this.userService.getUsuarioLogueado().subscribe({
      next: (user: UserDetailResponse) => {
        this.currentUserId = user.id;
      },
      error: (err) => {
        console.error('Error al obtener usuario logueado', err);
      }
    });

    this.petId = this.route.snapshot.paramMap.get('id');
    if (this.petId) {
      this.petService.getPetById(this.petId).subscribe({
        next: (data) => {
          this.petDetails = data;
        },
        error: (err) => {
          console.error('Error al obtener los detalles de la mascota:', err);
        }
      });
    }

    this.rolUsuario = localStorage.getItem('roles');
    this.cargarRazas();
    this.cargarEspecies();
  }
  cargarRazas(): void {
    this.razaService.obtenerListadoSinPaginar().subscribe({
      next: res => {
        this.listaRazas = res.contenido;
      },
      error: err => {
        console.error('Error cargando razas', err);
      }
    });
  }


  cargarEspecies(): void {
    this.especieService.obtenerListadoSpecies(0).subscribe({
      next: res => {
        this.listaEspecies = res.contenido;
      },
      error: err => {
        console.error('Error cargando especies', err);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.avatarFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.petEnEdicion.avatar = reader.result as string;
      };
      reader.readAsDataURL(this.avatarFile);
    }
  }

  esDueno(): boolean {
    return this.petDetails?.userDTO?.id === this.currentUserId;
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

  abrirModalCrearPublicacion(content: any) {
    this.modalService.open(content, { centered: true });
  }


  onArchivoSeleccionado(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.archivoPublicacion = input.files[0];
    }
  }


  crearPublicacion(modal: any) {
    const descripcion = this.nuevaPublicacionDescripcion;
    const file = this.archivoPublicacion;
    const mascotaId = this.petDetails?.id;

    if (!descripcion || !file || !mascotaId) {
      this.mostrarError = true;
      setTimeout(() => this.mostrarError = false, 3000);
      return;
    }

    const postData = { descripcion };

    this.publicationService.createPublicacion(postData, file, mascotaId).subscribe({
      next: () => {
        modal.close();
        this.recargarDetalles();
        this.nuevaPublicacionDescripcion = '';
        this.archivoPublicacion = null;
        this.mostrarToast = true;
        setTimeout(() => this.mostrarToast = false, 3000);
      },
      error: (err) => {
        console.error('Error al crear la publicación', err);
        this.mostrarError = true;
        setTimeout(() => this.mostrarError = false, 3000);
      }
    });
  }


  recargarDetalles() {
    if (this.petId) {
      this.petService.getPetById(this.petId).subscribe({
        next: (data) => {
          if (data.publicaciones) {
            data.publicaciones.sort((a, b) => {
              return new Date(b.fechaRegistro).getTime() - new Date(a.fechaRegistro).getTime();
            });
          }
          this.petDetails = data;
          console.log('Publicaciones cargadas:', this.petDetails.publicaciones);
        },
        error: (err) => console.error('Error al recargar detalles:', err)
      });
    }
  }

  confirmarEliminarMascota(modal: any) {
    if (this.petId) {
      this.petService.eliminarPet(this.petId).subscribe({
        next: () => {
          modal.close();
          console.log('Mascota eliminada correctamente');
          this.router.navigate(['/paraTi']);

        },
        error: (err) => {
          console.error('Error al eliminar mascota', err);
        }
      });
    }
  }

  abrirModalConfirmacionEliminar(content: any) {
    this.modalService.open(content, { centered: true });
  }

  editarMascota(modal: any) {
    const postData: any = {
      nombre: this.petEnEdicion.nombre,
      fechaNacimiento: this.petEnEdicion.fechaNacimiento,
      biografia: this.petEnEdicion.biografia,
      razaId: this.petEnEdicion.raza.id,
      especieId: this.petEnEdicion.especie.id,
    };
    if (!this.avatarFile) {
      postData.avatar = this.petEnEdicion.avatar;
    }
    this.petService.editPetUsuario(this.petEnEdicion.id, postData, this.avatarFile).subscribe({
      next: () => {
        modal.close();
        this.recargarDetalles();
        this.avatarFile = null;
      },
      error: err => {
        console.error('Error editando mascota', err);
      }
    });
  }

  abrirModalEdicion(mascota: MascotaResponse) {
    this.petEnEdicion = {
      id: mascota.id as `${string}-${string}-${string}-${string}-${string}`,
      nombre: mascota.nombre,
      biografia: mascota.biografia,
      fechaNacimiento: mascota.fechaNacimiento,
      avatar: mascota.avatar,
      raza: {
        ...mascota.raza,
        id: mascota.raza.id as `${string}-${string}-${string}-${string}-${string}`
      },
      especie: {
        ...mascota.especie,
        id: mascota.especie.id as `${string}-${string}-${string}-${string}-${string}`
      },
      userDTO: {
        ...mascota.userDTO,
        id: mascota.userDTO.id as `${string}-${string}-${string}-${string}-${string}`
      }
    };
    this.modalRef = this.modalService.open(this.editPetModal, { centered: true, backdrop: 'static' });
  }



}
