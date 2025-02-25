import { Card } from './card.model';
import { ShipAbility } from './enums';

export interface ShipCard extends Card {
  baseAttack: number;
  attack: number;
  baseHealth: number;
  health: number;
  baseInitiative: number;
  initiative: number;
  abilities: ShipAbility[];
}
