import { Injectable } from '@angular/core';
import { Game } from '../models/game.model';
import { Player } from '../models/player.model';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})

export class GameService {

  allGames: FirebaseListObservable<any[]>;
  allPlayers: FirebaseListObservable<any[]>;

  constructor(private database: AngularFireDatabase) {
    this.allGames = database.list('games');
    this.allPlayers = database.list('players');
  }

  addPlayer(player: Player) {
    this.allPlayers.push(player);
  }

  addGame(game: Game) {
    this.allGames.push(game);
  }

  playerLookup(name: string) {
    return this.database.object('players/' + name);
  }

  // getAllGamesByPlayer(name: string) {
  //   let list = this.database.list('games/', {
  //     query: {
  //       orderByChild: 'whitePlayer/name',
  //       equalTo: name
  //     }
  //   }).map(game => )
  // }


}
