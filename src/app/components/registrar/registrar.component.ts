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

  constructor(private usuarioService: UserService, private router: Router) { }

  registerUser() {
    if (this.password !== this.verifyPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    this.usuarioService.addUser(this.username, this.password, this.verifyPassword, this.email).subscribe({
      next: () => {
        this.successMessage = 'Registro exitoso';
        this.errorMessage = '';
        this.router.navigate(['/validacion']);
      },
      error: err => {
        this.errorMessage = err.error.message || 'Error al registrar';
        this.successMessage = '';
      }
    });
  }
}
