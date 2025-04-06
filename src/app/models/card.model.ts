import { CardType, CardRarity } from './enums';

export interface Card {
  id: string;
  title: string;
  description: string;
  effects: CardEffect[];
  imageUrl: string;
  cost: number;
  cardType: CardType;
  rarity: CardRarity;
  timesInBaseDeck: number;
}

export interface CardEffect {
  name: string;
  value: number;
}
