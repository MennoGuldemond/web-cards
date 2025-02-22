import { Card } from './card.model';
import { Ability } from './enums';

export interface ShipCard extends Card {
  baseAttack: number;
  baseHealth: number;
  baseInitiative: number;
  abilities: Ability[];
}
