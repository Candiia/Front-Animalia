import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { UserList, UserListsResponse } from '../../../../models/user-list.interfaces';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
  styleUrl: './card-user.component.css'
})
export class CardUserComponent implements OnChanges, OnInit {


  constructor(private userServices: UserService, private modalService: NgbModal, private fb: FormBuilder) { }
  @Input() searchTerm: string = '';
  userFiltrados: UserList[] = [];
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

  mostrarError = false;
  userForm!: FormGroup;
  mostrarToast = false;


  ngOnInit(): void {
    this.obtenerListado();
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm']) {
      this.filtrarUser();
    }
  }

  initForm(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      verifyPassword: ['', Validators.required]
    }, { validators: this.passwordsMatch });
  }

  passwordsMatch(group: AbstractControl): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirm = group.get('verifyPassword')?.value;
    return password === confirm ? null : { notMatching: true };
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

  abrirModalEdicion(user: UserList): void {
    this.userEnEdicion = user;

    this.userForm.patchValue({
      tipo: user.roles.includes('ADMIN') ? 'admin' : 'user',
      username: user.username,
      email: user.email,
      password: user.password,
      verifyPassword: user.password
    });

    this.modalService.open(this.editUserModal, { centered: true });
  }


  editarUsuario(modalRef: any) {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      this.mostrarError = true;
      setTimeout(() => this.mostrarError = false, 3000);
      return;
    }

    const { email, password, verifyPassword } = this.userForm.value;

    this.userServices.editUser(
      this.userEnEdicion.id,
      email,
      password,
      verifyPassword
    ).subscribe({
      next: () => {
        modalRef.close();
        this.obtenerListado();
        this.mostrarToast = true;
        setTimeout(() => this.mostrarToast = false, 3000);
      },
      error: err => {
        console.error('Error editando usuario', err);
        this.mostrarError = true;
        setTimeout(() => this.mostrarError = false, 3000);
      }
    });
  }

  obtenerListado(): void {
    this.userServices.obtenerListadoUser(this.page - 1).subscribe({
      next: (res: UserListsResponse) => {
        this.users = res.contenido;
        this.tamanioPagina = res.tamanioPagina;
        this.elementosEncontrados = res.elementosEncontrados;
        this.filtrarUser();
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

  filtrarUser(): void {
    const term = this.searchTerm.toLowerCase().trim();
    if (term === '') {
      this.userFiltrados = [...this.users];
    } else {
      this.userFiltrados = this.users.filter(e =>
        e.username.toLowerCase().includes(term)
      );
    }
  }

  esAdmin(user: UserList): boolean {
    return user.roles.some(rol => rol.toLowerCase() === 'admin');
  }

}
