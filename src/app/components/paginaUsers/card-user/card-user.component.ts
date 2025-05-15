import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { UserList, UserListsResponse } from '../../../../models/user-list.interfaces';

@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
  styleUrl: './card-user.component.css'
})
export class CardUserComponent {

  
    constructor(private userServices: UserService) { }
  
    users: UserList[] = [];
    page = 1;
    elementosEncontrados = 0;
    tamanioPagina = 20;
  
  
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

}
