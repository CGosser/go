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

  gameInfo: any[];
  selectedSize: number;
  fade: string = "";

  onSelectionChange(entry) {
    this.selectedSize = entry;
  }

  addFade(){
    this.fade = "fadeOut";
  }

  startGame(gameInfo){
    this.addFade();
    if (!gameInfo[2]){
      alert("Please select a size")
    } else {
      this.clickSender.emit(gameInfo);
    }
  }
}
