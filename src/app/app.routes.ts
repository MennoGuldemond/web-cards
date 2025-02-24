import { Routes } from '@angular/router';
import { CardEditComponent, CardsOverviewComponent } from './components';

export const routes: Routes = [
  { path: 'cards-overview', title: 'Overview', component: CardsOverviewComponent },
  { path: 'card-edit/:id', title: 'Edit', component: CardEditComponent },
  { path: 'card-edit', title: 'Edit', component: CardEditComponent },
  { path: '', redirectTo: '/cards-overview', pathMatch: 'full' },
];
