import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-player-ui',
  templateUrl: './player-ui.component.html',
  styleUrls: ['./player-ui.component.css']
})
export class PlayerUiComponent implements OnInit {

  @Input() player: string;

  otherPlayer (player){
    console.log(player)
    if (player == "white"){
      return "black";
    }
    if (player == "black"){
      return "white";
    }
  }
  constructor() { }

  ngOnInit() {
  }
}
