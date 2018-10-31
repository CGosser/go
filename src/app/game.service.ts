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

  getGameKey() {
    let out;
    this.allGames.subscribe(response => {
      response.sort((a,b) => {
        return b.$key-a.$key;
      })
      out = response[response.length-1].$key;
      console.log(out);
      return out;
    });
    // this.allGames.limitToLast(1);
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
