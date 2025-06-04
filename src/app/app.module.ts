import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavComponent } from './shared/nav/nav.component';
import { HomeComponent } from './components/paginaPrincipal/home/home.component';
import { ListCommentsComponent } from './components/comment/list-comments/list-comments.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { ListLikesComponent } from './components/likes/list-likes/list-likes.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CardUserLineComponent } from './components/paginaPrincipal/card-user-line/card-user-line.component';
import { CardUserPetComponent } from './components/paginaPrincipal/card-user-pet/card-user-pet.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { CardComentariosLikesComponent } from './components/paginaPrincipal/card-comentarios-likes/card-comentarios-likes.component';
import { CardRazasEspeciesComponent } from './components/paginaPrincipal/card-razas-especies/card-razas-especies.component';
import { AgChartsModule } from 'ag-charts-angular';
import { CardBreedsComponent } from './components/paginaRazas/card-breeds/card-breeds.component';
import { BreedsComponent } from './components/paginaRazas/breeds/breeds.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardUserComponent } from './components/paginaUsers/card-user/card-user.component';
import { UserComponent } from './components/paginaUsers/user/user.component';
import { CardPetComponent } from './components/paginaMascotas/card-pet/card-pet.component';
import { PetComponent } from './components/paginaMascotas/pet/pet.component';
import { SpeciesComponent } from './components/paginaEspecie/species/species.component';
import { CardSpeciesComponent } from './components/paginaEspecie/card-species/card-species.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailUserComponent } from './components/paginaDetailUser/detail-user/detail-user.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ListCommentsComponent,
    HomeComponent,
    PageNotFoundComponent,
    ListLikesComponent,
    FooterComponent,
    CardUserLineComponent,
    CardUserPetComponent,
    LoginComponent,
    CardComentariosLikesComponent,
    CardRazasEspeciesComponent,
    CardBreedsComponent,
    BreedsComponent,
    CardUserComponent,
    UserComponent,
    CardPetComponent,
    PetComponent,
    SpeciesComponent,
    CardSpeciesComponent,
    DetailUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AgChartsModule,
    NgbModule,
    NgbDropdownModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
