import { Player } from './player.model';

export class Game {
  dimension: number;
  whitePlayer: Player;
  blackPlayer: Player;
  board: any[];
  activeGame: boolean;
  currentTurn: Player; // either this.whitePlayer or this.blackPlayer;
  lastTurnPass: boolean;
  whiteCaptures: number;
  blackCaptures: number;

  constructor(public dim: number, public white: Player, public black: Player) {
    this.dimension = dim;
    this.whitePlayer = white;
    this.blackPlayer = black;
    this.board = createBoard(dim);
    this.active = true;
    this.currentTurn = this.blackPlayer;
    this.lastTurnPass = false;
    this.whiteCaptures = 0;
    this.blackCaptures = 0;
  }

  createBoard(N: number) {
    const out: any[] = [];
    for (let i = 0; i < N; i++) {
      const row: any[] = [];
      for (let j = 0; j < N; j++) {
        row.push(null);
      }
      out.push(row);
    }
    return out;
  }

  checkPoint(public point: number[]) {  // point: number is an element of {9, 13, 19}
    return this.board[point[0]][point[1]]
  }

  checkAdjacencies(public point: number[]) { // given a single point, returns a list of points in the board adjacent to that point
    const points: any[] = [];
    const i: number = point[0];
    const j: number = point[1];
    if (i+1 < this.dimension) { // Add the point directly BELOW the given point to adjacencies list
      points.push([i+1, j]);
    }
    if (j+1 < this.dimension) { // Add the point directly RIGHT of the given point to adjacencies list
      points.push([i, j+1]);
    }
    if (i > 0) { // Add the point directly ABOVE the given point to adjacencies list
      points.push([i-1, j]);
    }
    if (j > 0) { // Add the point directly LEFT of the given point to adjacencies list
      points.push([i, j-1]);
    }
    return points
  }


}
