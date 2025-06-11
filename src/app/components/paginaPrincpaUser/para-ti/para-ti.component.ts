import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Publicaicones } from '../../../../models/publication-list.interrface';
import { PublicationService } from '../../../services/publication.service';

@Component({
  selector: 'app-para-ti',
  templateUrl: './para-ti.component.html',
  styleUrl: './para-ti.component.css'
})
export class ParaTiComponent implements OnInit {

  publicaciones: Publicaicones[] = [];
  paginaActual: number = 0;
  cargando: boolean = false;
  paginasTotales: number = 0;
  @ViewChild('observador', { static: false }) observador!: ElementRef;
  constructor(private publicationService: PublicationService) { }

  ngOnInit() {

    this.paginaActual = 0;
    this.cargarPublicaciones();
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !this.cargando && this.paginaActual < this.paginasTotales) {
        this.paginaActual++;
        console.log(`Cargando página: ${this.paginaActual}`);
        this.cargarPublicaciones();
      }
    });

    observer.observe(this.observador.nativeElement);
  }

  cargarPublicaciones() {
    if (this.cargando) return;

    this.cargando = true;
    this.publicationService.getAllPublicaciones(this.paginaActual).subscribe({
      next: res => {
        this.publicaciones.push(...res.contenido);
        this.paginasTotales = res.paginasTotales;
        this.cargando = false;
      },
      error: err => {
        console.error('Error al cargar publicaciones:', err);
        this.cargando = false;
      }
    });
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

}
