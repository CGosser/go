import { Player } from './player.model';

export class Game {
  dimension: number;
  whitePlayer: Player;
  blackPlayer: Player;
  gameState: any[];
  activeGame: boolean;
  currentTurn: Player; // either this.whitePlayer or this.blackPlayer;
  lastTurnPass: boolean;
  whiteCaptures: number;
  blackCaptures: number;

  constructor(public dim: number, public white: Player, public black: Player) {
    this.dimension = dim;
    this.whitePlayer = white;
    this.blackPlayer = black;
    this.gameState = createNewGameState(dim);
    this.active = true;
    this.currentTurn = this.blackPlayer;
    this.lastTurnPass = false;
    this.whiteCaptures = 0;
    this.blackCaptures = 0;
  }

  createNewGameState(N: number) {
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

  checkPoint(public point: number[]) {  // point: number is an element of list {9, 13, 19}
    return this.gameState[point[0]][point[1]];
  }

  checkAdjacencies(public point: number[]) { // given a single point, returns a list of points in the gameState adjacent to that point
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
    return points;
  }

  buildGroup(public point: number[]) {
    // initialization
    const queue = [point];
    const group = [point];
    const liberties: any[] = [];
    const visited: any[] = [];
    const i = point[0];
    const j = point[1];
    const color = this.gameState[i][j];

    // search
    while (queue.length > 0) {
      const next = queue.shift();
      const neighbors = checkAdjacencies(next);
      neighbors.forEach(neighbor => {
        // check if neighbor has been searched. If yes, skip it.
        let skip = false;
        visited.forEach(visitedPoint => {
          if (neighbor[0] === visitedPoint[0] && neighbor[1] === visitedPoint[1]) { skip = true; }
        })
        if (skip == false) { // neighbor has not been searched
          if (this.gameState[neighbor[0]][neighbor[1]] == null) { // neighbor is a liberty
            liberties.push(neighbor);
            visited.push(neighbor);
          }
          else if (this.gameState[neighbor[0]][neighbor[1]] == color) { // neighbor is in the same group as point
            group.push(neighbor);
            queue.push(neighbor);
          }
          visited.push(neighbor);
        }
      })
    }

    return {
      liberties: liberties, // list of all empty points adjacent to members of the group. If the group is dead, liberties = [].
      group: group}; // list of points in the group
  }


}
