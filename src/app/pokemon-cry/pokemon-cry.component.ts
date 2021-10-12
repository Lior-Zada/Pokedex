import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon';

@Component({
  selector: 'app-pokemon-cry',
  templateUrl: './pokemon-cry.component.html',
  styleUrls: ['./pokemon-cry.component.css']
})
export class PokemonCryComponent implements OnInit {
  @Input() pokemon?: any;
  private audio = new Audio();

  constructor() { }

  ngOnInit(): void {
  }

  playCry(pokemon: Pokemon){
    this.audio.src = `../../../assets/sound/cries/${pokemon.id}.ogg`;
    this.audio.load();
    this.audio.play();
  }

  getSoundIcon() {
    return 'assets/jpg/sound-on.png';
  }
}
