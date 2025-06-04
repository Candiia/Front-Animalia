import { Component, OnInit } from '@angular/core';
import { PublicacionResponse } from '../../../../models/detail-publication.interfaces';
import { ActivatedRoute } from '@angular/router';
import { PublicationService } from '../../../services/publication.service';

@Component({
  selector: 'app-detail-publicacion',
  templateUrl: './detail-publicacion.component.html',
  styleUrl: './detail-publicacion.component.css'
})
export class DetailPublicacionComponent implements OnInit {

  publicacion?: PublicacionResponse;
  mostrarComentarios = false;
  nuevoComentario = '';

  constructor(private route: ActivatedRoute, private publicationService: PublicationService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.publicationService.obtenerPublicacionPorId(id).subscribe({
        next: (data) => this.publicacion = data,
        error: (err) => console.error('Error al obtener publicación:', err)
      });
    }
  }

  toggleComentarios(): void {
    this.mostrarComentarios = !this.mostrarComentarios;
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

  agregarComentario() {

  }

  editarComentario() {
  }

  eliminarComentario() {
  }

  tieneMuchosComentarios(): boolean {
    return (this.publicacion?.comentarioDTOList?.length ?? 0) > 4;
  }

}
