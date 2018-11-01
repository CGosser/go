import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../../models/player.model';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-end-game',
  templateUrl: './end-game.component.html',
  styleUrls: ['./end-game.component.css']
})
export class EndGameComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() game: Game;

  log(arg) {console.log(arg);}

}
