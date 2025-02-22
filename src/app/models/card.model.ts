import { CardType, CardRarity } from './enums';

export interface Card {
  id: string;
  title: string;
  description: string;
  cost: number;
  type: CardType;
  rarity: CardRarity;
}
