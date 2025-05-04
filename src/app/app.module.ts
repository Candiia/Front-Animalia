import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavComponent } from './shared/nav/nav.component';
import { DetailPetComponent } from './components/pet/detail-pet/detail-pet.component';
import { HomeComponent } from './components/paginaPrincipal/home/home.component';
import { ListPetComponent } from './components/pet/list-pet/list-pet.component';
import { ListBreedsComponent } from './components/breeds/list-breeds/list-breeds.component';
import { ListCommentsComponent } from './components/comment/list-comments/list-comments.component';
import { ListSpeciesComponent } from './components/species/list-species/list-species.component';
import { ListUserComponent } from './components/user/list-user/list-user.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { ListLikesComponent } from './components/likes/list-likes/list-likes.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CardUserLineComponent } from './components/card-user-line/card-user-line.component';
import { CardUserPetComponent } from './components/paginaPrincipal/card-user-pet/card-user-pet.component';
import { MatCardModule } from '@angular/material/card';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    ListUserComponent,
    NavComponent,
    DetailPetComponent,
    ListCommentsComponent,
    ListSpeciesComponent,
    HomeComponent,
    ListPetComponent,
    ListBreedsComponent,
    ListUserComponent,
    PageNotFoundComponent,
    ListLikesComponent,
    FooterComponent,
    CardUserLineComponent,
    CardUserPetComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
