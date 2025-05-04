import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/paginaPrincipal/home/home.component';
import { ListUserComponent } from './components/user/list-user/list-user.component';
import { ListBreedsComponent } from './components/breeds/list-breeds/list-breeds.component';
import { ListCommentsComponent } from './components/comment/list-comments/list-comments.component';
import { ListPetComponent } from './components/pet/list-pet/list-pet.component';
import { ListSpeciesComponent } from './components/species/list-species/list-species.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { ListLikesComponent } from './components/likes/list-likes/list-likes.component';
import { ListPublicationsComponent } from './components/publications/list-publications/list-publications.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'user-list', component: ListUserComponent },
  { path: 'pet-list', component: ListPetComponent },
  { path: 'breeds-list', component: ListBreedsComponent },
  { path: 'likes-list', component: ListLikesComponent },
  { path: 'species-list', component: ListSpeciesComponent },
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
