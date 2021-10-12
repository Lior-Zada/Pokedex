import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon';
import { LocalStorageService } from '../services/localstorage/local-storage.service';

@Component({
  selector: 'app-favorite-icon',
  templateUrl: './favorite-icon.component.html',
  styleUrls: ['./favorite-icon.component.css']
})
export class FavoriteIconComponent implements OnInit {
  @Input() pokemon?: any;
  @Output() newRefreshEvent = new EventEmitter();
  refresh() {
    this.newRefreshEvent.emit();
  }

  constructor( private _localStorageService: LocalStorageService) { }

  ngOnInit(): void {
  }

  isPokemonInFavorites(pokemon: Pokemon): boolean {
    return this._localStorageService.isPokemonInFavorites(pokemon);
  }

  getFavoriteIcon(pokemon: Pokemon): string {
    return this.isPokemonInFavorites(pokemon) ? 'assets/jpg/favIconFilled.png' : 'assets/jpg/favIconEmpty.png'
  }

  handleFavoriteAction(pokemon: Pokemon): void {
    if (this._localStorageService.isPokemonInFavorites(pokemon)) {
     this._localStorageService.removeFromFavorites(pokemon) 
    } else {
      this._localStorageService.addToFavorites(pokemon);
    }
    this.refresh();
  }
}
