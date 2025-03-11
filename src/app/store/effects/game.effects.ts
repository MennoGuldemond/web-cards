import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { drawCards, GAME_ADD_TO_HAND, GAME_SPEND_CREDITS, GAME_USE_FUEL, playCard } from '../actions';
import { map, switchMap } from 'rxjs';
import { isShip } from '@app/utils';
import { Store } from '@ngrx/store';
import { selectCards } from '../selectors';

@Injectable()
export class GameEffects {
  private store = inject(Store);
  private actions$ = inject(Actions);

  drawCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(drawCards),
      switchMap((action) => {
        return this.store.select(selectCards).pipe(
          map((cards) => {
            const toDraw = cards.slice(0, action.amount <= cards.length ? action.amount : cards.length);
            return { type: GAME_ADD_TO_HAND, cards: toDraw };
          })
        );
      })
    )
  );

  playCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(playCard),
      map((action) => {
        if (isShip(action.card)) {
          return { type: GAME_USE_FUEL, amount: action.card.cost };
        } else {
          return { type: GAME_SPEND_CREDITS, amount: action.card.cost };
        }
      })
    )
  );
}
