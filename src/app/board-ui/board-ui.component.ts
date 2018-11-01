import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game.model';
import { Player } from '../../models/player.model';
import { GameService } from '../game.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-board-ui',
  templateUrl: './board-ui.component.html',
  styleUrls: ['./board-ui.component.css']
})
export class BoardUIComponent implements OnInit {
  game: Game;
  size: number;
  rows: number[];
  columns: number[];
  dotPosition = [[[3,3],[3,7],[7,3],[7,7],[5,5]], [[4,4],[4,10],[10,10],[10,4],[7,7]], [[4,4], [4,10], [4,16], [10,4], [10,10], [10,16], [16,4], [16,10], [16,16]]];

  directionToggle: string = "normal";
  animationReset: string = "colorChangeBlack";
  fillToggle: string = "forwards";
  playerBefore: string;
  playerAfter: string;

  key: string;


  constructor(private gameService: GameService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.playerChange();
    this.route.params.forEach((urlParameters) => {
      this.key = urlParameters['key'];
    })
    this.gameService.getCurrentGame(this.key).subscribe(response => {
      const player1 = new Player(response.whitePlayer);
      const player2 = new Player(response.blackPlayer);
      this.game = new Game(response.dimension, player1, player2);
      this.size = this.game.dimension;
      this.rows = Array(this.size);
      this.columns = Array(this.size);
      this.game.gameState = this.game.translateFBToMatrix(response.gameState);
      this.game.activePlayer = response.activePlayer;
      this.game.passivePlayer = response.passivePlayer;
      this.game.blackCaptures = response.blackCaptures;
      this.game.whiteCaptures = response.whiteCaptures;
      this.game.ko = response.ko;
      this.game.activeGame = response.activeGame;
      this.game.resignedPlayer = response.resignedPlayer;
      this.game.winner = response.winner;
      this.game.margin = response.margin;
      this.playerChange();
    });
  }

  playerChange(){
    console.log("true");
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

  placeStone(stone: number[]) {
    this.playerBefore = this.game.activePlayer;
    this.game.placeStone([stone[0], stone[1]]);
    this.playerAfter = this.game.activePlayer;
    if(this.playerBefore !== this.playerAfter) {
      // if (this.directionToggle == "normal"){
      //     this.directionToggle = "reverse";
      //     this.animationReset = "colorChangeWhite";
      //     this.fillToggle = "backwards";
      //   } else {
      //     this.directionToggle = "normal";
      //     this.animationReset = "colorChangeBlack";
      //     this.fillToggle = "forwards";
      //   }
      const testObj = this.game.translateMatrixToFB();
      const gameStateInFirebase = this.gameService.getCurrentGame(this.key);
      gameStateInFirebase.update({
        activePlayer: this.game.activePlayer,
        passivePlayer: this.game.passivePlayer,
        blackCaptures: this.game.blackCaptures,
        whiteCaptures: this.game.whiteCaptures,
        ko: this.game.ko,
        gameState: this.game.translateMatrixToFB()
      })
    }

    // if (this.directionToggle == "normal"){
    //   this.directionToggle = "reverse";
    //   this.animationReset = "colorChangeWhite";
    //   this.fillToggle = "backwards";
    // } else {
    //   this.directionToggle = "normal";
    //   this.animationReset = "colorChangeBlack";
    //   this.fillToggle = "forwards";
    // }

  }
  endGameUpdate() {
    const gameStateInFirebase = this.gameService.getCurrentGame(this.key);
    gameStateInFirebase.update({
      activeGame: this.game.activeGame,
      winner: this.game.winner,
      margin: this.game.margin,
      resignedPlayer: this.game.resignedPlayer
    })
  }

  pass(){
    this.game.pass();
    if (this.directionToggle == "normal"){
      this.directionToggle = "reverse";
      this.animationReset = "colorChangeWhite";
      this.fillToggle = "backwards";
    } else {
      this.directionToggle = "normal";
      this.animationReset = "colorChangeBlack";
      this.fillToggle = "forwards";
    }
    this.endGameUpdate();
  }

  resign(){
    this.game.resign();
    this.endGameUpdate()
  }

}
