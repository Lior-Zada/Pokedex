import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, switchMap } from 'rxjs/operators';

import { Pokemon } from '../interfaces/pokemon';
import { Evolutions } from '../interfaces/evolutions'; 
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokeApiBaseUrl = 'https://pokeapi.co/api/v2';
  private getPokemonsUrl = `${this.pokeApiBaseUrl}/pokemon?limit=151`;
  private getPokemonUrl  = `${this.pokeApiBaseUrl}/pokemon`;
  private getPokemonLocationsUrl  = `${this.pokeApiBaseUrl}/pokemon/:id/encounters`;
  private getPokemonSpeciesUrl  = `${this.pokeApiBaseUrl}/pokemon-species`;

  constructor(
    private http: HttpClient) { }

  getPokemons(): Observable<Pokemon[]> {
    const pokemons = this.http.get(this.getPokemonsUrl)
    .pipe(
      map(response => this.processPokemons(response)),
      catchError(this.handleError<any>('getPokemons', []))
    );
    return pokemons;
  }

  private processPokemons(response: any):  Pokemon[] {
    let dataTransform: Pokemon[] = [];
    
    for (let i = 0; i < response.results.length; i++) {
      let pokemon = response.results[i];
      dataTransform.push({
          'id': i + 1,
          'name': pokemon.name,
        });
    }
    return dataTransform;
  }
 
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      return of(result as T);
    };
  }

  getPokemon(id: number): Observable<any> {
    const pokemon = this.http.get(`${this.getPokemonUrl}/${id}`)
    .pipe(
      catchError(this.handleError<any>('getPokemon', []))
    );
    return pokemon;
  }
  
  getPokemonLocations(id: number): Observable<any> {
    const url = this.getPokemonLocationsUrl.replace(':id', String(id));
    const locations = this.http.get(url)
    .pipe(
      catchError(this.handleError<any>('getPokemonLocation', []))
    );
    return locations;
  }

  getPokemonEvolutions(id: number): Observable<Evolutions> {
    let evolutions: Evolutions = {
      evolutionTrees: [],
      evolves_from_species: ''
    };
    
    return this.http.get(`${this.getPokemonSpeciesUrl}/${id}`)
    .pipe(
      switchMap((firstResponse: any) => {
        evolutions.evolves_from_species = this.getPreviousEvolutionIfExists(firstResponse);
        let pokemonName = firstResponse.name;

        return this.http.get(firstResponse.evolution_chain.url)
        .pipe(
          map((secondResponse: any) => {
            secondResponse.chain.evolves_to.forEach((evolution: any, index: number) => {    
              if (evolution.species.name != evolutions.evolves_from_species && evolution.species.name != pokemonName) {
                evolutions.evolutionTrees[index] = [];
                evolutions.evolutionTrees[index].push(evolution.species.name);
              }
              
              evolution.evolves_to.forEach((nextEvolution: any) => {
                if (nextEvolution.species.name != pokemonName) {
                  if (! Array.isArray(evolutions.evolutionTrees[index])) {
                    evolutions.evolutionTrees[index] = [];
                  }
                  evolutions.evolutionTrees[index].push(nextEvolution.species.name);
                }
              });
            });
            return evolutions;
          })
        )
      }),
      catchError(this.handleError<any>('getPokemonLocation', []))
    )
  }

  private getPreviousEvolutionIfExists(response: any): string {
      return response.evolves_from_species !== null && response.evolves_from_species.hasOwnProperty('name') ? response.evolves_from_species.name : '(None)';
  }


}
