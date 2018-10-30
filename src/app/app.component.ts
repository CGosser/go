import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'go';
  gameOn: boolean = false;


  startGame(gameInfo){
    if (service.playerLookup(gameInfo[0])) {
      
    }
    service.playerLookup(gameInfo[1])
    this.gameOn = true;
  }

}
