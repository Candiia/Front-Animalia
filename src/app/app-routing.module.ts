import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/paginaPrincipal/home/home.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { ListPublicationsComponent } from './components/publications/list-publications/list-publications.component';
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

const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'user-list', component: UserComponent },
  { path: 'pet-list', component: PetComponent },
  { path: 'breeds-list', component: BreedsComponent },
  { path: 'species-list', component: SpeciesComponent },
  { path: 'publication-list', component: ListPublicationsComponent },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: 'login', component: LoginComponent },
  { path: 'detailUser/:id', component: DetailUserComponent },
  { path: 'detailPublicacion/:id', component: DetailPublicacionComponent },
  { path: 'detailPet/:id', component: DetailPetComponent },
  { path: 'paraTi', component: ParaTiComponent },
  { path: 'registrar', component: RegistrarComponent },
  { path: 'validacion', component: ValidacionComponent },
  { path: 'buscar', component: PantllaBuscarComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
