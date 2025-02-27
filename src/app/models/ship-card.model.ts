import { Card } from './card.model';

export interface ShipCard extends Card {
  baseAttack: number;
  attack: number;
  maxHealth: number;
  health: number;
  baseInitiative: number;
  initiative: number;
}
