import { Routes } from '@angular/router';
import { CardEditComponent, CardsOverviewComponent } from './components';

export const routes: Routes = [
  { path: 'cards-overview', component: CardsOverviewComponent },
  { path: 'card-edit', component: CardEditComponent },
  { path: '', redirectTo: '/cards-overview', pathMatch: 'full' },
];
