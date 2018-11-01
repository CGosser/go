import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../game.service';
import { Player } from '../../models/player.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-player-ui',
  templateUrl: './player-ui.component.html',
  styleUrls: ['./player-ui.component.css']
})
export class PlayerUiComponent implements OnInit {

  key: string;
  player1: Player;
  player2: Player;
  blackStoneCount: number;
  whiteStoneCount: number;

  constructor(private gameService: GameService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.key = urlParameters['key'];
    })
    this.gameService.getCurrentGame(this.key).subscribe(response => {
      this.player1 = response.whitePlayer;
      this.player2 = response.blackPlayer;
      this.blackStoneCount = response.blackCaptures
      this.whiteStoneCount = response.blackCaptures
    });
  }

  @Input() player: string;


  otherPlayer (player){
    // console.log(player)
    if (player == "white"){
      return "black";
    }
    if (player == "black"){
      return "white";
    }
  }
}
