import { Card, CardType } from '@app/models';

export class CardResolver {
  play(card: Card) {
    switch (card.type) {
      case CardType.support:
        break;
      case CardType.ship:
        break;
      case CardType.stationUpgrade:
        break;
      case CardType.economic:
        break;
      default:
        break;
    }
  }
}
