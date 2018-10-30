import { Player } from './player.model';

export class Game {
  dimension: number;
  whitePlayer: Player;
  blackPlayer: Player;
  gameState: any[];
  activeGame: boolean;
  activePlayer: string; // either "white" or "black"
  passivePlayer: string;
  lastTurnPass: boolean;
  whiteCaptures: number; // whiteCaptures = the number of black stones the white player has captured
  blackCaptures: number; // blackCaptures = ths number of white stones the black player has captured

  constructor(public dim: number, public white: Player, public black: Player) {
    this.dimension = dim;
    this.whitePlayer = white;
    this.blackPlayer = black;
    this.gameState = this.createNewGameState(dim);
    this.activeGame = true;
    this.activePlayer = "black";
    this.passivePlayer = "white";
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

  checkPoint( point: number[]) {  // point: number is an element of list {9, 13, 19}
    return this.gameState[point[0]][point[1]];
  }

  checkAdjacencies(point: number[]) { // given a single point, returns a list of points in the gameState adjacent to that point
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

  buildGroup(point: number[]) {
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
      const neighbors = this.checkAdjacencies(next);
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
      group: group
    }; // list of points in the group
  }

  killGroup(point: number[]) { // Set all stones in the same group as the given stone to null in this.gameState
    const groupToKill = this.buildGroup(point);
    groupToKill.group.forEach(neighbor => {
      this.gameState[neighbor[0]][neighbor[1]] = null;
    })
  }

  placeStone(stone: number[]) {
    if (this.activePlayer == "white") {this.gameState[stone[0]][stone[1]] = "white";}
    else {this.gameState[stone[0]][stone[1]] = "black";}
    const neighbors = this.checkAdjacencies(stone);
    neighbors.forEach(neighbor => {
      if (this.activePlayer == this.gameState[stone[0]][stone[1]]) { // if opponent has a stone in position neighbor, check for captures from newly placed stone
        const group = this.buildGroup(neighbor); // get neighbor's entire group
        if (group.liberties.length == 0) { // if neighbor group no longer has any liberties, kill it
          const captures = group.liberties.length;
          if (this.activePlayer == "white") {this.whiteCaptures += captures;}
          else {this.blackCaptures += captures;}
          this.killGroup(neighbor);
        }
      }
    })
    const group = this.buildGroup(stone);
    if (group.liberties.length == 0) {this.illegalMove(stone);}
    else {this.nextTurn();}
  }

  illegalMove(point: number[]) { // Set a single stone to null in this.gameState
    this.gameState[point[0]][point[1]] = null;
  }

  nextTurn() { // Actions to take when passing play to the next player
    if (this.activePlayer == "white") {this.activePlayer = "black"; this.passivePlayer = "white";}
    else {this.activePlayer = "white"; this.passivePlayer = "black";}
  }

  pass() {
    if (this.lastTurnPass == false) {
      this.lastTurnPass = true;
    }
    else {
      this.endGame();
    }
  }

  endGame() {
    this.activeGame = false;
  }

  resign() {
    this.endGame();
  }

}
