import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { UserDetailResponse } from '../../../../models/detail-user.interfaces';
import { HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-card-user-line',
  templateUrl: './card-user-line.component.html',
  styleUrl: './card-user-line.component.css'
})
export class CardUserLineComponent implements OnInit {

  user: UserDetailResponse | null = null;
  dropdownOpen = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.userService.getUsuarioLogueado().subscribe({
      next: (data) => this.user = data,
      error: (err) => console.error('Error cargando usuario logueado', err)
    });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  viewProfile() {
    if (this.user?.id) {
      this.router.navigate([`/detailUser/${this.user.id}`]);
    } else {
      console.error('Usuario no disponible');
    }
  }


}