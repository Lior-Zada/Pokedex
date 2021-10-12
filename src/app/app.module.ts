import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { FavoriteIconComponent } from './favorite-icon/favorite-icon.component';
import { SoundBarComponent } from './sound-bar/sound-bar.component';
import { PokemonCryComponent } from './pokemon-cry/pokemon-cry.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonsComponent,
    PokemonDetailComponent,
    FavoritesComponent,
    FavoriteIconComponent,
    SoundBarComponent,
    PokemonCryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
