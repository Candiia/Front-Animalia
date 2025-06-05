import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ComentarioDtolist, PublicacionResponse } from '../../../../models/detail-publication.interfaces';
import { ActivatedRoute } from '@angular/router';
import { PublicationService } from '../../../services/publication.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CommentService } from '../../../services/comment.service';

@Component({
  selector: 'app-detail-publicacion',
  templateUrl: './detail-publicacion.component.html',
  styleUrl: './detail-publicacion.component.css'
})
export class DetailPublicacionComponent implements OnInit {

  publicacion?: PublicacionResponse;
  mostrarComentarios = false;
  nuevoComentario = '';
  comentarioEnEliminacion: ComentarioDtolist | null = null;
  @ViewChild('confirmDeleteModal', { static: true }) confirmarEliminarTemplate!: TemplateRef<any>;
  private modalRef?: NgbModalRef;

  constructor(private route: ActivatedRoute, private publicationService: PublicationService, private modalService: NgbModal, private commentService: CommentService) { }

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

  abrirModalEliminarComentario(comentario: ComentarioDtolist): void {
    this.comentarioEnEliminacion = comentario;
    this.modalRef = this.modalService.open(this.confirmarEliminarTemplate, {
      centered: true,
      backdrop: 'static'
    });
  }

  confirmarEliminarComentario(): void {
    if (!this.comentarioEnEliminacion) return;

    this.commentService.eliminarComentario(this.comentarioEnEliminacion.id).subscribe({
      next: () => {
        this.modalRef?.close();
        this.comentarioEnEliminacion = null;
        this.recargarPublicacion();
      },
      error: err => {
        console.error('Error al eliminar el comentario', err);
      }
    });
  }

  private recargarPublicacion(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.publicationService.obtenerPublicacionPorId(id).subscribe({
        next: (data) => this.publicacion = data,
        error: (err) => console.error('Error al refrescar publicación:', err)
      });
    }
  }
  tieneMuchosComentarios(): boolean {
    return (this.publicacion?.comentarioDTOList?.length ?? 0) > 4;
  }

}
