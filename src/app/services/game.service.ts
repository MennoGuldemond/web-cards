import { Injectable } from '@angular/core';
import { Card } from '@app/models';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  playCard(card: Card) {
    console.log(card);
  }
}
