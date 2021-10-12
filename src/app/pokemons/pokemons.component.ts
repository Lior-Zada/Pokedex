import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon';
import { LocalStorageService } from '../services/localstorage/local-storage.service';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {
  pokemons: Pokemon[] = [];
  
  @Input() isFavorites: boolean = false;

  getPokemons(): void {
    if (this.isFavorites) {
      this.pokemons =  this.pokemons =  this._localStorageService.getFavorites();
    }else {
      this.pokemonService.getPokemons().subscribe(observer => this.pokemons = observer);
    }
  }

  constructor(
    private pokemonService: PokemonService,
    private _localStorageService: LocalStorageService
    ) { }
    

  ngOnInit(): void {
    this.getPokemons();
  }

  // I Know this isn't the proper way to do this, but considering time limitations and the fact that I'm learning Angular on the fly, thats what i was able to conceive. sorry.
  removeColor(event:any) {
    event.target.parentNode.parentNode.classList.remove("modifiedBgColor")
  }
  addColor(event:any) {
    event.target.parentNode.parentNode.classList.add("modifiedBgColor")
  }

  // This ugly hack is because i failed to use BehaviorSubject, and have to listen to changes manually
  refresh(event:any) {
    this.getPokemons();
  }
}
