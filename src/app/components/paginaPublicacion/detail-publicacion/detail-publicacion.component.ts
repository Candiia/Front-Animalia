import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ComentarioDtolist } from '../../../../models/detail-publication.interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicationService } from '../../../services/publication.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CommentService } from '../../../services/comment.service';
import { LikeService } from '../../../services/like.service';
import { Publicaicones } from '../../../../models/publication-list.interrface';

@Component({
  selector: 'app-detail-publicacion',
  templateUrl: './detail-publicacion.component.html',
  styleUrl: './detail-publicacion.component.css'
})
export class DetailPublicacionComponent implements OnInit {

  publicacion?: Publicaicones;
  mostrarComentarios = false;
  nuevoComentario = '';
  comentarioEnEliminacion: ComentarioDtolist | null = null;
  @ViewChild('confirmDeleteModal', { static: true }) confirmarEliminarTemplate!: TemplateRef<any>;
  modalRef?: NgbModalRef;
  comentarioEditando: ComentarioDtolist | null = null;
  @ViewChild('confirmDeletePublicacionModal', { static: true }) confirmarEliminarPublicacionTemplate!: TemplateRef<any>;
  modalPublicacionRef?: NgbModalRef;
  rolUsuario: string | null = null;
  usernameActual: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private publicationService: PublicationService,
    private modalService: NgbModal,
    private commentService: CommentService,
    private likeService: LikeService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.publicationService.obtenerPublicacionPorId(id).subscribe({
        next: (data) => this.publicacion = data,
        error: (err) => console.error('Error al obtener publicación:', err)
      });
    }
    this.rolUsuario = localStorage.getItem('roles');
    this.usernameActual = localStorage.getItem('username');


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

  abrirModalEliminarComentario(comentario: ComentarioDtolist): void {
    this.comentarioEnEliminacion = comentario;
    this.modalRef = this.modalService.open(this.confirmarEliminarTemplate, {
      centered: true,
      backdrop: 'static'
    });
  }

  confirmarEliminarComentario(): void {
    if (!this.comentarioEnEliminacion) return;

    const isAdmin = this.rolUsuario === 'ADMIN';

    const eliminar$ = isAdmin
      ? this.commentService.eliminarComentario(this.comentarioEnEliminacion.id)
      : this.commentService.eliminarComentarioUsuario(this.comentarioEnEliminacion.id);

    eliminar$.subscribe({
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


  manejarComentario(): void {
    if (!this.nuevoComentario.trim() || !this.publicacion?.id) return;

    if (this.comentarioEditando) {
      const editDto = { comentario: this.nuevoComentario.trim() };
      const isAdmin = this.rolUsuario === 'ADMIN';

      const editar$ = isAdmin
        ? this.commentService.editarComentario(this.comentarioEditando.id, editDto)
        : this.commentService.editarComentarioUsuario(this.comentarioEditando.id, editDto);

      editar$.subscribe({
        next: () => {
          this.nuevoComentario = '';
          this.comentarioEditando = null;
          this.recargarPublicacion();
        },
        error: err => {
          console.error('Error al editar el comentario:', err);
        }
      });
    } else {
      this.commentService.agregarComentario(this.publicacion.id, this.nuevoComentario.trim()).subscribe({
        next: () => {
          this.nuevoComentario = '';
          this.recargarPublicacion();
        },
        error: err => {
          console.error('Error al agregar el comentario:', err);
        }
      });
    }
  }

  editarComentario(comentario: ComentarioDtolist): void {
    this.comentarioEditando = comentario;
    this.nuevoComentario = comentario.texto;
  }

  cancelarEdicion(): void {
    this.comentarioEditando = null;
    this.nuevoComentario = '';
  }


  alternarLike(): void {
    if (!this.publicacion?.id) return;

    if (this.publicacion.hasLike) {
      this.likeService.quitarLike(this.publicacion.id).subscribe({
        next: () => this.recargarPublicacion(),
        error: (err) => console.error('Error al quitar like:', err)
      });
    } else {
      this.likeService.agregarLike(this.publicacion.id).subscribe({
        next: () => this.recargarPublicacion(),
        error: (err) => console.error('Error al agregar like:', err)
      });
    }
  }

  abrirModalEliminarPublicacion(): void {
    this.modalPublicacionRef = this.modalService.open(this.confirmarEliminarPublicacionTemplate, {
      centered: true,
      backdrop: 'static'
    });
  }

  confirmarEliminarPublicacion(): void {
    if (!this.publicacion?.id) return;

    this.publicationService.eliminarPublicacion(this.publicacion.id).subscribe({
      next: () => {
        this.modalPublicacionRef?.close();
        setTimeout(() => {
          this.router.navigate(['/user-list']);
        });
      },
      error: err => {
        console.error('Error al eliminar la publicación', err);
      }
    });
  }

}
