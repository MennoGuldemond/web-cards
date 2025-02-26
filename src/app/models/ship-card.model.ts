import { Card } from './card.model';

export interface ShipCard extends Card {
  baseAttack: number;
  attack: number;
  baseHealth: number;
  health: number;
  baseInitiative: number;
  initiative: number;
}
