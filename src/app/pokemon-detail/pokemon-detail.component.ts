import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PokemonService } from '../services/pokemon.service';
import { LocalStorageService } from '../services/localstorage/local-storage.service';
import { Evolutions } from '../interfaces/evolutions';
import { Pokemon } from '../interfaces/pokemon';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {

@Input() pokemon?: any;
pokemonLocations: any;
pokemonEvolutions!: Evolutions;

  constructor(
    private route: ActivatedRoute, 
    private pokemonService: PokemonService,
    private location: Location,
    private _localStorageService: LocalStorageService
  ) {
   }

  ngOnInit(): void {
    this.getPokemon();
    this.getPokemonLocations();
    this.getPokemonEvolutions();
  }

  getPokemon(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pokemonService.getPokemon(id).subscribe(observer => this.pokemon = observer);
  }

  getPokemonLocations(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pokemonService.getPokemonLocations(id).subscribe(observer =>  this.pokemonLocations = observer);
  }

  getPokemonEvolutions(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pokemonService.getPokemonEvolutions(id).subscribe(observer => this.pokemonEvolutions = observer);
  }

  goBack(): void {
    this.location.back();
  }

  addToFavorites(item: any) {
    const pokemon: Pokemon = {
      id: item.id,
      name: item.name
    }
    this._localStorageService.addToFavorites(pokemon);
  }

  removeFromFavorites(item: any) {
    const pokemon: Pokemon = {
      id: item.id,
      name: item.name
    }
    this._localStorageService.removeFromFavorites(pokemon);
  }
}
