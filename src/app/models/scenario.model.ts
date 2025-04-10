import { ShipCard } from './ship-card.model';

export interface Scenario {
  id: string;
  name: string;
  description: string;
  waves: Wave[];
}

export interface Wave {
  turn: number;
  enemies: string[];
}
