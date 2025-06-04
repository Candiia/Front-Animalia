import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaDtolist, PublicacionDtos, UserDetailResponse } from '../../../../models/detail-user.interfaces';

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
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.getUserDetail(this.userId);
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

  getAvatarUrl(mascota: MascotaDtolist): string {
    if (mascota.avatar) {
      return mascota.avatar;
    } else {
      return "http://localhost:8080/download/" + mascota.avatar;
    }
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

}
