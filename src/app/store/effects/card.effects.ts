import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { pipe } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CardsService } from '@app/services';
import { CARD_SET_CARD, CARD_SET_CARDS, getCard, getCards } from '../actions';
import { asShip, isShip } from '@app/utils';

@Injectable()
export class CardEffects {
  private actions$ = inject(Actions);
  private cardService = inject(CardsService);

  getCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCard),
      switchMap((action) => {
        return this.cardService.get(action.id);
      }),
      pipe(
        map((card) => {
          return { type: CARD_SET_CARD, card: card };
        })
      )
    )
  );

  getCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCards),
      switchMap(() => {
        return this.cardService.getAll();
      }),
      pipe(
        map((cards) => {
          cards.forEach((card) => {
            if (isShip(card)) {
              card = asShip(card);
            }
          });
          return { type: CARD_SET_CARDS, cards: cards };
        })
      )
    )
  );
}
