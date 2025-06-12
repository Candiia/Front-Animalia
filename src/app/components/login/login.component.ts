import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username = '';
  password = '';
  registerDialog: boolean = false;
  errorMessage: string = '';
  mostrarToastError = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
  }


  loginUser() {
    this.authService.loginUser(this.username, this.password).subscribe({
      next: resp => {
        localStorage.setItem('account_id', resp.id);
        localStorage.setItem('token', resp.token);
        localStorage.setItem('roles', JSON.stringify(resp.roles));

        if (resp.roles.includes('ADMIN')) {
          localStorage.setItem('roles', 'ADMIN');
          this.router.navigateByUrl('/home');
        } else if (resp.roles.includes('USER')) {
          localStorage.setItem('roles', 'USER');
          this.router.navigateByUrl('/paraTi');
        }

      },
      error: (err) => {
        this.errorMessage = err.error.detail || 'No tienes acceso para entrar.';
        this.mostrarToastError = true;

        setTimeout(() => {
          this.mostrarToastError = false;
        }, 5000);
      }

    });
  }

  showRegisterDialog() {
    this.registerDialog = true;
  }
  closeRegisterDialog() {
    this.registerDialog = false;
  }


}
