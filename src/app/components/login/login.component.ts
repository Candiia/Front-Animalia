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

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
  }


  loginUser() {
    this.authService.loginUser(this.username, this.password).subscribe({
      next: resp => {
        localStorage.setItem('account_id', resp.id)
        localStorage.setItem('token', resp.token)
        if (resp.roles.includes('ADMIN')) {
          this.router.navigateByUrl('/home');
        }
      },
      error: (err) => {
        this.errorMessage = err.error.detail || 'No tienes acceso para entrar.';
      }
    })
  }

  showRegisterDialog() {
    this.registerDialog = true;
  }
  closeRegisterDialog() {
    this.registerDialog = false;
  }


}
