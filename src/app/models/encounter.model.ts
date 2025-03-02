import { ShipCard } from './ship-card.model';

export interface Encounter {
  arkMaxHealth: number;
  arkHealth: number;
  Enemies: ShipCard[];
}
