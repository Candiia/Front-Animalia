import { Component, TemplateRef, ViewChild } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { UserList, UserListsResponse } from '../../../../models/user-list.interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  mostrarToast = false;
  mostrarError = false;
  @ViewChild('userModal') userModal!: TemplateRef<any>;
  nuevoUser = {
    username: '',
    password: '',
    verifyPassword: '',
    email: '',
    tipo: 'User'
  };

  searchTerm: string = '';

  constructor(private userServices: UserService, private modalService: NgbModal) { }


  openModal() {
    this.modalService.open(this.userModal, { centered: true });
  }


  submitUser(modalRef: any) {
    const { username, password, verifyPassword, email, tipo } = this.nuevoUser;

    if (!username || !password || !verifyPassword || !email || !tipo) {
      this.mostrarError = true;
      setTimeout(() => this.mostrarError = false, 3000);
      return;
    }

    const request$ = tipo === 'admin'
      ? this.userServices.addAdmin(username, password, verifyPassword, email)
      : this.userServices.addUser(username, password, verifyPassword, email);

    request$.subscribe({
      next: () => {
        this.nuevoUser = { username: '', password: '', verifyPassword: '', email: '', tipo: 'user' };
        modalRef.close();
        this.mostrarToast = true;
        setTimeout(() => this.mostrarToast = false, 3000);
      },
      error: (error) => {
        console.error('Error al guardar', error);
        this.mostrarError = true;
        setTimeout(() => this.mostrarError = false, 3000);
      }
    });
  }

}
