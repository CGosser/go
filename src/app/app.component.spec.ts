import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BoardUIComponent } from './board-ui/board-ui.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { PlayerUiComponent } from './player-ui/player-ui.component';
import { Game } from '../models/game.model';
import { Player } from '../models/player.model';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        BoardUIComponent,
        StartScreenComponent,
        PlayerUiComponent
      ],
    }).compileComponents();

  }));

  const rand = () => {return Math.floor(Math.random()*9);};

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'go'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('go');
  });

  it('should generate a new game through calling the constructor function for the Game class with a blank gameState matrix', () => {
    const player1 = new Player("Player 1");
    const player2 = new Player("Player 2");
    const game9 = new Game(9, player1, player2)
    expect(game9.gameState[rand()][rand()]).toEqual(null);
  });

  it('given a game with no dead stones remaining, resolveScore will correctly attribute surrounded empty points to the appropriate player, tabulate scores, and give the winner of the game and the margin of victory', () => {
    const player1 = new Player("Roofus");
    const player2 = new Player("Doofus");
    let game = new Game(9,player1,player2);
    game.gameState = [[null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null],["black","black","black","black","black","black","black","black","black"],["white","white","white","white","white","white","white","white","white"],[null,null,null,null,null,null,null,null,null],["black","black","black",null,"white","white","white","white","white"],["black",null,"black",null,"white",null,null,null,null],["black",null,"black",null,"white",null,null,null,null]];
    game.resolveScore();
    console.log("Black score: " + game.blackScore);
    console.log("White score: " + game.whiteScore);
    console.log("Winner: " + game.winner.name);
    console.log("Margin of victory: " + game.margin);
    expect(game.winner).toEqual(player2);
  });
});
