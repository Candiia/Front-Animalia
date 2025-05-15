import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/paginaPrincipal/home/home.component';
import { ListCommentsComponent } from './components/comment/list-comments/list-comments.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { ListLikesComponent } from './components/likes/list-likes/list-likes.component';
import { ListPublicationsComponent } from './components/publications/list-publications/list-publications.component';
import { LoginComponent } from './components/login/login.component';
import { BreedsComponent } from './components/paginaRazas/breeds/breeds.component';
import { UserComponent } from './components/paginaUsers/user/user.component';
import { PetComponent } from './components/paginaMascotas/pet/pet.component';
import { SpeciesComponent } from './components/paginaEspecie/species/species.component';

const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'user-list', component: UserComponent },
  { path: 'pet-list', component: PetComponent },
  { path: 'breeds-list', component: BreedsComponent },
  { path: 'likes-list', component: ListLikesComponent },
  { path: 'species-list', component: SpeciesComponent },
  { path: 'comment-list', component: ListCommentsComponent },
  { path: 'publication-list', component: ListPublicationsComponent },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
