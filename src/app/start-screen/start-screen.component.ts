import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Player } from '../../models/player.model';
import { Game } from '../../models/game.model';
import { GameService } from '../game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.css'],
  providers: [GameService]
})
export class StartScreenComponent implements OnInit {

  constructor(private gameService: GameService, private router: Router) { }

  ngOnInit() {
  }

  @Output() clickSender = new EventEmitter();

  gameInfo: any[];
  selectedSize: number;
  fade: string = "";
  sizeChosen: boolean = false;
  sizeAlert: boolean = false;

  setBoardSize(){
    this.sizeChosen = true;
  }

  onSelectionChange(entry) {
    this.selectedSize = entry;
  }

  addFade(){
    this.fade = "fadeOut";
  }

  startGame(gameInfo){
    if (!gameInfo[2]){
      this.sizeAlert = true;
    } else {
      this.addFade();
      const coinFlip = Math.floor(Math.random() * 2);
      let player1;
      let player2;
      if (coinFlip == 0) {
        player1 = new Player(gameInfo[0]);
        player2 = new Player(gameInfo[1]);
      } else {
        if (!gameInfo[1]){
          player1 = new Player("Player 1");
        } else {
          player1 = new Player(gameInfo[1]);
        }
        if (!gameInfo[0]){
          player2 = new Player("Player 2");
        } else {
          player2 = new Player(gameInfo[0]);
        }
      }
      const game = new Game(gameInfo[2], player1, player2);
      this.gameService.addGame(game);
      this.gameService.allGames.subscribe(response => {
        response.sort((a,b) => {
          return b.$key-a.$key;
        });
        const gameKey = response[response.length-1].$key;
        setTimeout(() => {
     this.router.navigate(['game', gameKey])
   }
   , 3000);
      });
    }
  }
}
