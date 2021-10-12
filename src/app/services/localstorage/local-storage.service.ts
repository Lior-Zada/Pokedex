import { Injectable } from '@angular/core';
import { LocalStorageRefService } from './local-storage-ref.service';
// import { BehaviorSubject } from 'rxjs';
import { Pokemon } from 'src/app/interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private _localStorage: Storage;

  constructor(private _localStorageRefService: LocalStorageRefService) { 
    this._localStorage = _localStorageRefService.localStorage; 
  }

  addToFavorites(pokemon: Pokemon) {
    let favorites = this.getFavorites();
    if (favorites.length <= 5 && ! this.isPokemonInFavorites(pokemon)) {
      favorites.push(pokemon);
      this.setInfo(favorites, 'favorites');
    }
  }

  removeFromFavorites(pokemon: Pokemon) {
    const newFavorites = this.getFavorites().filter(favorite => favorite.id !== pokemon.id);
    this.setInfo(newFavorites, 'favorites');
  }

  getFavorites(): Pokemon[] {
    return this.loadInfo('favorites');
  }

  isPokemonInFavorites(pokemon: Pokemon): boolean {
    return Boolean(this.getFavorites().find(item => item.id === pokemon.id));
  }

  setInfo(data: any, storageName: string) {
    this._localStorage.setItem(storageName, JSON.stringify(data));
 }

 loadInfo(storageName: string): Pokemon[] {
    return JSON.parse(this._localStorage.getItem(storageName) || '[]');
 }

 clearInfo(storageName: string) {
    this._localStorage.removeItem(storageName);
 }

}
