import { Injectable } from '@angular/core';
import { Card, CardType } from '@app/models';

@Injectable({
  providedIn: 'root',
})
export class CardInterpreterService {
  play(card: Card) {
    switch (card.type) {
      case CardType.ship:
        break;
      case CardType.support:
        break;
      default:
        break;
    }
  }
}
