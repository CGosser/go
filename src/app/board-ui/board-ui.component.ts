import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game.model';
import { gameStates } from '../../models/mock-game-states';
import { Player } from '../../models/player.model';

@Component({
  selector: 'app-board-ui',
  templateUrl: './board-ui.component.html',
  styleUrls: ['./board-ui.component.css']
})
export class BoardUIComponent implements OnInit {
  whitePlayer: Player = new Player("white");
  blackPlayer: Player = new Player("black");
  testGame: Game = new Game(9, this.whitePlayer, this.blackPlayer);
  size: number = this.testGame.dimension;
  rows: number[] = Array(this.size);
  columns: number[] = Array(this.size);
  dotPosition = [[[3,3],[3,7],[7,3],[7,7],[5,5]], [[4,4],[4,10],[10,10],[10,4],[7,7]], [[4,4], [4,10], [4,16], [10,4], [10,10], [10,16], [16,4], [16,10], [16,16]]];


  constructor() { }

  ngOnInit() {
  }

  placeStone(stone: number[]){
    this.testGame.placeStone([stone[0], stone[1]]);

  }

}
