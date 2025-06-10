import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaDtolist, PublicacionDtos, UserDetailResponse } from '../../../../models/detail-user.interfaces';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PetService } from '../../../services/pet.service';
import { MascotaList } from '../../../../models/pet-list.interfaces';
import { Breed } from '../../../../models/breeds-list.interfaces';
import { SpeciesLists } from '../../../../models/species-list.interfaces';
import { SpeciesService } from '../../../services/species.service';
import { BreedsService } from '../../../services/breeds.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrl: './detail-user.component.css'
})
export class DetailUserComponent implements OnInit {
  userId!: string;
  userData: UserDetailResponse | null = null;
  mostrarMascotas: boolean = true;
  mostrarPublicaciones: boolean = true;
  public pagePubli: number = 1;
  public tamanioPaginaPubli: number = 4;
  public elementosEncontradosPubli: number = 0;
  public pageMascota: number = 1;
  public tamanioPaginaMascota: number = 4;
  public elementosEncontradosMascota: number = 0;
  mostrarToast = false;
  mostrarError = false;

  listaRazas: Breed[] = [];
  listaEspecies: SpeciesLists[] = [];
  nuevaMascota: MascotaList = {
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
  modalRef!: NgbModalRef;
 usuarioLogueado: UserDetailResponse | null = null;
  mostrarBotonAddMascota: boolean = false;
  
  @ViewChild('addPetModal') addPetModal!: any;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private modalService: NgbModal,
    private petServices: PetService,
    private breedsService: BreedsService,
    private speciesService: SpeciesService
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.getUserDetail(this.userId);
    this.cargarRazas();
    this.cargarEspecies();
    this.userService.getUsuarioLogueado().subscribe((usuario) => {
      this.usuarioLogueado = usuario;
      this.mostrarBotonAddMascota = this.usuarioLogueado?.id === this.userId;
    });
  }

  getUserDetail(id: string) {
    this.userService.getUserById(id).subscribe((data: UserDetailResponse) => {
      this.userData = data;
      this.elementosEncontradosPubli = data.publicacionDTOS?.length || 0;
      this.elementosEncontradosMascota = data.mascotaDTOList?.length || 0;
    });
  }

  toggleMascotas() {
    this.mostrarMascotas = !this.mostrarMascotas;
    this.pageMascota = 1;
  }

  trackByMascotaId(index: number, mascota: any): string {
    return mascota.id;
  }

  get mascotasPaginadas() {
    if (!this.userData?.mascotaDTOList) return [];
    const start = (this.pageMascota - 1) * this.tamanioPaginaMascota;
    const end = start + this.tamanioPaginaMascota;
    return this.userData.mascotaDTOList.slice(start, end);
  }

  onPageMascotas(event: number): void {
    this.pageMascota = event;
  }

  togglePublicaciones() {
    this.mostrarPublicaciones = !this.mostrarPublicaciones;
    this.pagePubli = 1;
  }


  trackByPublicacionId(index: number, pub: any): string {
    return pub.id;
  }

  getImage(url: string | undefined | null): string {
    const prefix = "http://localhost:8080/download/";
    if (!url) {
      return '';
    }
    if (url.startsWith(prefix) && url.includes("http", prefix.length)) {
      return url.substring(prefix.length);
    }
    if (!url.startsWith(prefix) && !url.startsWith("http")) {
      return prefix + url;
    }
    return url;
  }

  get publicacionesPaginadas() {
    if (!this.userData?.publicacionDTOS) return [];
    const start = (this.pagePubli - 1) * this.tamanioPaginaPubli;
    const end = start + this.tamanioPaginaPubli;
    return this.userData.publicacionDTOS.slice(start, end);
  }

  onPagePubli(event: number): void {
    this.pagePubli = event;
  }

  irADetallePublicacion(id: string) {
    this.router.navigate(['/detailPublicacion', id]);
  }


  abrirModalAgregar() {
    this.archivoAvatar = null;
    this.modalRef = this.modalService.open(this.addPetModal, { centered: true, backdrop: 'static' });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.archivoAvatar = file;
    }
  }

  crearMascota(modal: any) {
    const { nombre, fechaNacimiento, biografia, especie, raza } = this.nuevaMascota;

    if (!nombre || !fechaNacimiento || !biografia || !especie?.id || !raza?.id) {
      this.mostrarError = true;
      setTimeout(() => this.mostrarError = false, 3000);
      return;
    }

    const postData = {
      nombre,
      fechaNacimiento,
      biografia,
      razaId: raza.id,
      especieId: especie.id
    };

    this.petServices.createPet(postData, this.archivoAvatar).subscribe({
      next: () => {
        modal.close();
        this.getUserDetail(this.userId);
        this.mostrarToast = true;
        setTimeout(() => this.mostrarToast = false, 3000);
      },
      error: err => {
        console.error('Error creando mascota', err);
        this.mostrarToast = true;
        setTimeout(() => this.mostrarToast = false, 3000);
      }
    });
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
}
