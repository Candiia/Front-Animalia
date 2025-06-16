import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { UserList, UserListsResponse } from '../../../../models/user-list.interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

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

  userForm!: FormGroup;
  searchTerm: string = '';
  usernameTaken: boolean = false;

  constructor(private userServices: UserService, private modalService: NgbModal,
    private fb: FormBuilder) { }


  openModal() {
    this.modalService.open(this.userModal, { centered: true });
    this.userForm.reset({ tipo: 'user' });
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      tipo: ['user', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      verifyPassword: ['', Validators.required]
    }, { validators: this.spasswordsMatch });
  }

  spasswordsMatch(group: AbstractControl) {
    const pass = group.get('password')?.value;
    const confirm = group.get('verifyPassword')?.value;
    return pass === confirm ? null : { notMatching: true };
  }

  submitUser(modalRef: any) {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      this.mostrarError = true;
      setTimeout(() => this.mostrarError = false, 3000);
      return;
    }

    const { username, password, verifyPassword, email, tipo } = this.userForm.value;

    this.userServices.getAllUsers().subscribe({
      next: users => {
        const exists = users.some(user => user.username === username);
        if (exists) {
          this.usernameTaken = true;
          this.userForm.get('username')?.setErrors({ taken: true });
          this.mostrarError = true;
          setTimeout(() => this.mostrarError = false, 3000);
          return;
        }

        this.usernameTaken = false;
        const request$ = tipo === 'admin'
          ? this.userServices.addAdmin(username, password, verifyPassword, email)
          : this.userServices.addUserAdmin(username, password, verifyPassword, email);

        request$.subscribe({
          next: () => {
            this.userForm.reset({ tipo: 'user' });
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
      },
      error: err => {
        console.error('Error al obtener usuarios', err);
        this.mostrarError = true;
        setTimeout(() => this.mostrarError = false, 3000);
      }
    });
  }


}
