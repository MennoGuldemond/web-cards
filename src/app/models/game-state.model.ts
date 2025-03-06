import { ShipCard } from './ship-card.model';

export interface GameState {
  arkHealth: number;
  credits: number;
  fuel: number;
  turn: number;
  playerShips: ShipCard[];
  enemyShips: ShipCard[];
}
