import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board-ui',
  templateUrl: './board-ui.component.html',
  styleUrls: ['./board-ui.component.css']
})
export class BoardUIComponent implements OnInit {
  size: number = 9;
  rows: number[] = Array(this.size);
  columns: number[] = Array(this.size);
  dotPosition = [[3,3],[3,7],[7,3],[7,7],[5,5]]

  gameState = [["black", "black", null, null, null, null, null, null, null],
               [null, null, null, null, null, null, null, null, null],
               [null, "black", null, null, null, null, null, null, null],
               [null, null, null, null, null, null, "black", null, null],
               [null, null, null, "white", null, null, null, null, null],
               [null, null, null, null, null, null, null, null, null],
               [null, null, null, null, null, null, "black", null, null],
               [null, null, null, null, null, null, null, null, null],
               [null, null, null, null, null, null, null, null, "white"]]

  constructor() { }

  ngOnInit() {
  }

}
