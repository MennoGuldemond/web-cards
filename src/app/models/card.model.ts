import { CardType, CardRarity } from './enums';

export interface Card {
  id: string;
  title: string;
  description: string;
  effects: CardEffect[];
  imageUrl: string;
  cost: number;
  type: CardType;
  rarity: CardRarity;
}

export interface CardEffect {
  name: string;
  value: number;
}
