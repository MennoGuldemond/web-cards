import { Card } from './card.model';

export interface PlayerData {
  xp: number;
  level: number;
  credits: number;
  unlockedCards: Card[];
}
