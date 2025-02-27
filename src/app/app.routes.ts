import { Routes } from '@angular/router';
import { CardEditComponent, CardsOverviewComponent, GameBoardComponent } from './components';

export const routes: Routes = [
  { path: 'game', title: 'Game', component: GameBoardComponent },
  { path: 'cards-overview', title: 'Overview', component: CardsOverviewComponent },
  { path: 'card-edit/:id', title: 'Edit', component: CardEditComponent },
  { path: 'card-edit', title: 'Edit', component: CardEditComponent },
  { path: '', redirectTo: '/game', pathMatch: 'full' },
];
