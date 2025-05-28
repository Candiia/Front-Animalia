import { Component, TemplateRef, ViewChild } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { UserList, UserListsResponse } from '../../../../models/user-list.interfaces';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
  styleUrl: './card-user.component.css'
})
export class CardUserComponent {


  constructor(private userServices: UserService, private modalService: NgbModal) { }

  users: UserList[] = [];
  page = 1;
  elementosEncontrados = 0;
  tamanioPagina = 20;
  userEnEliminacion: UserList | null = null;
  @ViewChild('confirmDeleteModal', { static: true }) confirmarEliminarTemplate!: TemplateRef<any>;
  @ViewChild('editUserModal') editUserModal!: TemplateRef<any>;

  private modalRef?: NgbModalRef;
  userEnEdicion: UserList = {
    id: '00000000-0000-0000-0000-000000000000',
    username: '',
    email: '',
    fechaRegistro: '',
    roles: [],
    enable: false,
    mascotaDTOList: [],
    password: '',
    verifyPassword: ''
  };


  ngOnInit(): void {
    this.obtenerListado();
  }

  obtenerListado(): void {
    this.userServices.obtenerListadoUser(this.page - 1).subscribe({
      next: (res: UserListsResponse) => {
        console.log(res.contenido);
        this.users = res.contenido;
        this.tamanioPagina = res.tamanioPagina;
        this.elementosEncontrados = res.elementosEncontrados;

      },
      error: (err) => {
        console.error('Error al obtener el listado', err);
      }
    });
  }


  onPage(newPage: number): void {
    this.page = newPage;
    this.obtenerListado();
  }


  abrirModalDeEliminar(user: UserList) {
    this.userEnEliminacion = user;
    this.modalRef = this.modalService.open(this.confirmarEliminarTemplate, {
      centered: true,
      backdrop: 'static'
    });
  }


  confirmarEliminar(): void {
    if (!this.userEnEliminacion || !this.modalRef) return;

    this.userServices.eliminarUser(this.userEnEliminacion.id).subscribe({
      next: () => {
        this.modalRef?.close();
        this.obtenerListado();
      },
      error: err => {
        console.error('Error eliminando un usuario', err);
      }
    });
  }

  abrirModalEdicion(user: UserList) {
    this.userEnEdicion = { ...user };
    this.modalRef = this.modalService.open(this.editUserModal, { centered: true, backdrop: 'static' });
  }

  editarUsuario(modal: any) {
    this.userServices.editUser(this.userEnEdicion.id, this.userEnEdicion.email, this.userEnEdicion.password, this.userEnEdicion.verifyPassword).subscribe({
      next: () => {
        modal.close();
        this.obtenerListado();
      },
      error: err => {
        console.error('Error editando usuario', err);
      }
    });
  }


}
