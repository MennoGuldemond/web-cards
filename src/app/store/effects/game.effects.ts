import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  drawCards,
  GAME_ADD_TO_HAND,
  GAME_SET_PHASE,
  GAME_SET_TURN,
  GAME_SPEND_CREDITS,
  GAME_USE_FUEL,
  nextPhase,
  nextTurn,
  playCard,
} from '../actions';
import { map, switchMap, take } from 'rxjs';
import { isShip } from '@app/utils';
import { Store } from '@ngrx/store';
import { selectCards, selectPhase, selectTurn } from '../selectors';
import { TurnPhase } from '@app/models';

@Injectable()
export class GameEffects {
  private store = inject(Store);
  private actions$ = inject(Actions);

  nextPhase$ = createEffect(() =>
    this.actions$.pipe(
      ofType(nextPhase),
      switchMap((action) => {
        return this.store.select(selectPhase).pipe(
          take(1),
          map((phase) => {
            switch (phase) {
              case TurnPhase.EnemyPlay:
                return { type: GAME_SET_PHASE, phase: TurnPhase.PlayerPlay };
              case TurnPhase.PlayerPlay:
                return { type: GAME_SET_PHASE, phase: TurnPhase.BattleResolve };
              case TurnPhase.BattleResolve:
                return { type: GAME_SET_PHASE, phase: TurnPhase.DrawPhase };
              case TurnPhase.DrawPhase:
                this.store.dispatch(nextTurn());
                return { type: GAME_SET_PHASE, phase: TurnPhase.EnemyPlay };
              default:
                throw new Error('Turn phase not implemented.');
            }
          })
        );
      })
    )
  );

  nextTurn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(nextTurn),
      switchMap((action) => {
        return this.store.select(selectTurn).pipe(
          take(1),
          map((turnNumber) => {
            return { type: GAME_SET_TURN, number: turnNumber + 1 };
          })
        );
      })
    )
  );

  drawCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(drawCards),
      switchMap((action) => {
        return this.store.select(selectCards).pipe(
          take(1),
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
