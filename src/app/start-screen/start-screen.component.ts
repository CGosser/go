import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Player } from '../../models/player.model';
import { Game } from '../../models/game.model';
import { GameService } from '../game.service';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.css'],
  providers: [GameService]
})
export class StartScreenComponent implements OnInit {

  constructor(private gameService: GameService) { }

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
        player1 = new Player(gameInfo[1]);
        player2 = new Player(gameInfo[0]);
      }
      const game = new Game(gameInfo[2], player1, player2);
      this.gameService.addGame(game);
      let gameKey = this.gameService.getGameKey();
    }
  }
}
