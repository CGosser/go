import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardUIComponent } from './board-ui/board-ui.component';
import { StartScreenComponent } from './start-screen/start-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardUIComponent,
    StartScreenComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
