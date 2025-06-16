import { Component, ElementRef, ViewChild } from '@angular/core';
import { Publicaicones } from '../../../models/publication-list.interrface';
import { PublicationService } from '../../services/publication.service';
import { SpeciesService } from '../../services/species.service';
import { BreedsService } from '../../services/breeds.service';
import { SpeciesLists } from '../../../models/species-list.interfaces';
import { Breed } from '../../../models/breeds-list.interfaces';

@Component({
  selector: 'app-pantlla-buscar',
  templateUrl: './pantlla-buscar.component.html',
  styleUrl: './pantlla-buscar.component.css'
})
export class PantllaBuscarComponent {


  terminoBusqueda: string = '';
  publicaciones: Publicaicones[] = [];
  paginaActual: number = 0;
  cargando: boolean = false;
  paginasTotales: number = 0;
  @ViewChild('observador', { static: false }) observador!: ElementRef;
  modoBusqueda: boolean = false;
  busquedaNombre: string = '';
  busquedaRaza: string = '';
  busquedaEspecie: string = '';
  listaRazas: Breed[] = [];
  listaEspecies: SpeciesLists[] = [];

  constructor(private publicationService: PublicationService, private especieService: SpeciesService, private razaService: BreedsService) { }
  ngOnInit() {
    this.paginaActual = 0;
    this.cargarPublicaciones();
    this.cargarListas();
  }

  cargarListas() {
    this.razaService.obtenerListadoBreeds(0).subscribe({
      next: res => {
        this.listaRazas = res.contenido;
      },
      error: err => {
        console.error('Error cargando razas', err);
      }
    });

    this.especieService.obtenerListadoSpecies(0).subscribe({
      next: res => {
        this.listaEspecies = res.contenido;
      },
      error: err => {
        console.error('Error cargando especies', err);
      }
    });
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

    const filtros = this.modoBusqueda ? {
      nombre: this.busquedaNombre.trim(),
      raza: this.busquedaRaza.trim(),
      especie: this.busquedaEspecie.trim()
    } : {};

    const observable = this.modoBusqueda
      ? this.publicationService.buscarPublicaciones(filtros, this.paginaActual)
      : this.publicationService.getAllPublicaciones(this.paginaActual);

    observable.subscribe({
      next: res => {
        if (this.paginaActual === 0) {
          this.publicaciones = res.contenido;
        } else {
          this.publicaciones.push(...res.contenido);
        }
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
    const prefix = "http://localhost:8081/download/";
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

  buscar() {
    this.publicaciones = [];
    this.paginaActual = 0;
    this.modoBusqueda = true;
    this.cargando = true;

    const filtros: { nombre?: string; raza?: string; especie?: string } = {};
    if (this.busquedaNombre.trim()) filtros.nombre = this.busquedaNombre.trim();
    if (this.busquedaRaza.trim()) filtros.raza = this.busquedaRaza.trim();
    if (this.busquedaEspecie.trim()) filtros.especie = this.busquedaEspecie.trim();

    this.publicationService.buscarPublicaciones(filtros, this.paginaActual).subscribe({
      next: res => {
        this.publicaciones = res.contenido;
        this.paginasTotales = res.paginasTotales;
        this.cargando = false;
      },
      error: err => {
        console.error('Error al buscar publicaciones:', err);
        this.cargando = false;
      }
    });
  }

}
