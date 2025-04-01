import { Card } from './card.model';

export interface ShipCard extends Card {
  ship: {
    baseAttack: number;
    attack: number;
    maxHealth: number;
    health: number;
    baseInitiative: number;
    initiative: number;
    transparentImageUrl: string;
    isEnemy: boolean;
    level: number;
  };
}
