import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sound-bar',
  templateUrl: './sound-bar.component.html',
  styleUrls: ['./sound-bar.component.css']
})
export class SoundBarComponent implements OnInit {
  muted: boolean = true;
  private audio = new Audio();

  constructor() { }

  ngOnInit(): void {
    this.initializeAudio();
  }

  initializeAudio(){
    this.audio.src = "../../../assets/sound/theme.mp3";
    this.audio.load();
  }
  playAudio(){
    this.audio.play();
  }

  stopAudio(){
    this.audio.pause();
  }

  muteUnmute(): void {
    this.muted = ! this.muted;

    if (this.muted) {
      this.stopAudio();
    }else {
      this.playAudio();
    }
  }

  getSoundIcon() {
    if (this.muted) {
      return 'assets/jpg/sound-off.png';
    }
    return 'assets/jpg/sound-on.png';
  }
}
