import { CardType, CardRarity } from './enums';

export interface Card {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  cost: number;
  type: CardType;
  rarity: CardRarity;
}
