import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { nextPhase, nextTurn, TURN_SET_PHASE, TURN_SET_TURN } from '../actions';
import { Store } from '@ngrx/store';
import { selectPhase, selectTurn } from '../selectors';
import { TurnPhase } from '@app/models';

@Injectable()
export class TurnEffects {
  private store = inject(Store);
  private actions$ = inject(Actions);

  nextPhase$ = createEffect(() =>
    this.actions$.pipe(
      ofType(nextPhase),
      switchMap((action) => {
        return this.store.select(selectPhase).pipe(
          map((phase) => {
            switch (phase) {
              case TurnPhase.EnemyPlay:
                return { type: TURN_SET_PHASE, phase: TurnPhase.PlayerPlay };
              case TurnPhase.PlayerPlay:
                return { type: TURN_SET_PHASE, phase: TurnPhase.BattleResolve };
              case TurnPhase.BattleResolve:
                return { type: TURN_SET_PHASE, phase: TurnPhase.DrawPhase };
              case TurnPhase.DrawPhase:
                return { type: TURN_SET_PHASE, phase: TurnPhase.EnemyPlay };
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
          map((turnNumber) => {
            return { type: TURN_SET_TURN, number: turnNumber + 1 };
          })
        );
      })
    )
  );
}
