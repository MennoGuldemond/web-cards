import { Routes } from '@angular/router';
import {
  CardEditComponent,
  CardsOverviewComponent,
  GameBoardComponent,
  ScenarioBuilderComponent,
  ScenarioOverviewComponent,
} from './components';

export const routes: Routes = [
  { path: 'game', title: 'Game', component: GameBoardComponent },
  { path: 'cards-overview', title: 'Card Overview', component: CardsOverviewComponent },
  { path: 'card-edit/:id', title: 'Card Edit', component: CardEditComponent },
  { path: 'card-edit', title: 'Card Edit', component: CardEditComponent },
  { path: 'scenario-overview', title: 'Scenario Overview', component: ScenarioOverviewComponent },
  { path: 'scenario-builder/:id', title: 'Scenario Builder', component: ScenarioBuilderComponent },
  { path: 'scenario-builder', title: 'Scenario Builder', component: ScenarioBuilderComponent },
  { path: '', redirectTo: '/game', pathMatch: 'full' },
];
