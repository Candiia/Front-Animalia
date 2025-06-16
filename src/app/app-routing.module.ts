import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/paginaPrincipal/home/home.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { BreedsComponent } from './components/paginaRazas/breeds/breeds.component';
import { UserComponent } from './components/paginaUsers/user/user.component';
import { PetComponent } from './components/paginaMascotas/pet/pet.component';
import { SpeciesComponent } from './components/paginaEspecie/species/species.component';
import { DetailUserComponent } from './components/paginaDetailUser/detail-user/detail-user.component';
import { DetailPublicacionComponent } from './components/paginaPublicacion/detail-publicacion/detail-publicacion.component';
import { DetailPetComponent } from './components/paginaMascotas/detail-pet/detail-pet.component';
import { ParaTiComponent } from './components/paginaPrincpaUser/para-ti/para-ti.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { ValidacionComponent } from './components/validacion/validacion.component';
import { PantllaBuscarComponent } from './components/pantlla-buscar/pantlla-buscar.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [

  { path: 'home', component: HomeComponent, canActivate: [authGuard], data: { roles: ['ADMIN'] } },
  { path: 'user-list', component: UserComponent, canActivate: [authGuard], data: { roles: ['ADMIN'] } },
  { path: 'pet-list', component: PetComponent, canActivate: [authGuard], data: { roles: ['ADMIN'] } },
  { path: 'breeds-list', component: BreedsComponent, canActivate: [authGuard], data: { roles: ['ADMIN'] } },
  { path: 'species-list', component: SpeciesComponent, canActivate: [authGuard], data: { roles: ['ADMIN'] } },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: 'login', component: LoginComponent },
  { path: 'detailUser/:id', component: DetailUserComponent, canActivate: [authGuard], data: { roles: ['USER', 'ADMIN'] } },
  { path: 'detailPublicacion/:id', component: DetailPublicacionComponent, canActivate: [authGuard], data: { roles: ['USER', 'ADMIN'] } },
  { path: 'detailPet/:id', component: DetailPetComponent, canActivate: [authGuard], data: { roles: ['USER', 'ADMIN'] } },
  { path: 'paraTi', component: ParaTiComponent, canActivate: [authGuard], data: { roles: ['USER'] } },
  { path: 'registrar', component: RegistrarComponent },
  { path: 'validacion', component: ValidacionComponent },
  { path: 'buscar', component: PantllaBuscarComponent, canActivate: [authGuard], data: { roles: ['USER'] } },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
