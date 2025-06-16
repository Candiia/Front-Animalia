import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent {

  username: string = '';
  email: string = '';
  password: string = '';
  verifyPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  usernameTaken: boolean = false;

  constructor(private usuarioService: UserService, private router: Router) { }

  registerUser() {
    this.usernameTaken = false;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.password !== this.verifyPassword) {
      return;
    }

    this.usuarioService.getAllUsers().subscribe({
      next: (users) => {
        const exists = users.some(user => user.username === this.username);
        if (exists) {
          this.usernameTaken = true;
          return;
        }

        this.usuarioService.addUser(this.username, this.password, this.verifyPassword, this.email).subscribe({
          next: () => {
            this.successMessage = 'Registro exitoso';
            this.router.navigate(['/validacion']);
          },
          error: err => {
            this.errorMessage = err.error.message || 'Error al registrar';
          }
        });
      },
      error: () => {
        this.errorMessage = 'No se pudo verificar el nombre de usuario.';
      }
    });
  }


}
