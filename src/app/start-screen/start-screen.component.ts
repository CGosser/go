import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.css']
})
export class StartScreenComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Output() clickSender = new EventEmitter();

  startGame(gameOn){
    this.clickSender.emit(gameOn);
  }

}
