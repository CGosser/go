import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game.model';
import { Player } from '../../models/player.model';
import { GameService } from '../game.service';

@Component({
  selector: 'app-board-ui',
  templateUrl: './board-ui.component.html',
  styleUrls: ['./board-ui.component.css']
})
export class BoardUIComponent implements OnInit {
  whitePlayer: Player = new Player("white");
  blackPlayer: Player = new Player("black");
  testGame: Game = new Game(13, this.whitePlayer, this.blackPlayer);
  size: number = this.testGame.dimension;
  rows: number[] = Array(this.size);
  columns: number[] = Array(this.size);
  dotPosition = [[[3,3],[3,7],[7,3],[7,7],[5,5]], [[4,4],[4,10],[10,10],[10,4],[7,7]], [[4,4], [4,10], [4,16], [10,4], [10,10], [10,16], [16,4], [16,10], [16,16]]];

  directionToggle: string = "normal";
  animationReset: string = "colorChangeBlack";
  fillToggle: string = "forwards";
  playerBefore: string;
  playerAfter: string;


  constructor(private gameService: GameService) { }

  ngOnInit() {
  }

  placeStone(stone: number[]){
    // this.gameService.getCurrentGame().subscribe(currentGame => {
    //   this.playerBefore = currentGame.activePlayer
    // })
    this.testGame.placeStone([stone[0], stone[1]]);
    // this.gameService.getCurrentGame().subscribe(currentGame => {
    //   this.playerAfter = currentGame.activePlayer
    //   if (this.directionToggle == "normal"){
    //     this.directionToggle = "reverse";
    //     this.animationReset = "colorChangeWhite";
    //     this.fillToggle = "backwards";
    //   } else {
    //     this.directionToggle = "normal";
    //     this.animationReset = "colorChangeBlack";
    //     this.fillToggle = "forwards";
    //   }
    // })
    if (this.directionToggle == "normal"){
      this.directionToggle = "reverse";
      this.animationReset = "colorChangeWhite";
      this.fillToggle = "backwards";
    } else {
      this.directionToggle = "normal";
      this.animationReset = "colorChangeBlack";
      this.fillToggle = "forwards";
    }

  }
  pass(){
    this.testGame.pass();
    if (this.directionToggle == "normal"){
      this.directionToggle = "reverse";
      this.animationReset = "colorChangeWhite";
      this.fillToggle = "backwards";
    } else {
      this.directionToggle = "normal";
      this.animationReset = "colorChangeBlack";
      this.fillToggle = "forwards";
    }

  }

}
