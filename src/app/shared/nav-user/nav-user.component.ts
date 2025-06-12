import { Component, OnInit } from '@angular/core';
import { UserDetailResponse } from '../../../models/detail-user.interfaces';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-user',
  templateUrl: './nav-user.component.html',
  styleUrl: './nav-user.component.css'
})
export class NavUserComponent implements OnInit {
  user: UserDetailResponse | null = null;

  constructor(
    private userService: UserService,
    private router: Router,
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

  viewProfile() {
    if (this.user?.id) {
      this.router.navigate([`/detailUser/${this.user.id}`]);
    } else {
      console.error('Usuario no disponible');
    }
  }
}
