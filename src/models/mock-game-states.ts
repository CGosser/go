import { Game } from '../models/game.model'
import { Player } from './player.model';

export class gameStates {

  constructor(){};

  whitePlayer: Player = new Player("white");
  blackPlayer: Player = new Player("black");
  testGame: Game = new Game(9, this.whitePlayer, this.blackPlayer);

  // this.testGame.placeStone([4,4]);

}
