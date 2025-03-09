import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GAME_SPEND_CREDITS, GAME_USE_FUEL, playCard } from '../actions';
import { map } from 'rxjs';
import { isShip } from '@app/utils';

@Injectable()
export class GameEffects {
  private actions$ = inject(Actions);

  playCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(playCard),
      map((action: any) => {
        // TODO: fix this ungly data type (action and card are merged)
        if (isShip(action)) {
          return { type: GAME_USE_FUEL, amount: action.cost };
        } else {
          return { type: GAME_SPEND_CREDITS, amount: action.cost };
        }
      })
    )
  );
}
