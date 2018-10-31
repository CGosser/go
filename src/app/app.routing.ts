import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { BoardUIComponent } from './board-ui/board-ui.component';

const appRoutes: Routes = [
  {
    path: '',
    component: StartScreenComponent
  },
  {
    path: 'game/:key',
    component: BoardUIComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
