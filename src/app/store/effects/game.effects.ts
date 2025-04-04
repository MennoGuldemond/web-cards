import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addPlayerShip,
  drawCards,
  GAME_ADD_TO_HAND,
  GAME_SET_PHASE,
  GAME_SET_TURN,
  GAME_SPEND_CREDITS,
  GAME_USE_FUEL,
  nextPhase,
  nextTurn,
  playCard,
  startBattle,
  setPhase,
  spawnEnemies,
} from '../actions';
import { map, tap, withLatestFrom } from 'rxjs';
import { isShip, withRandomId } from '@app/utils';
import { Store } from '@ngrx/store';
import { selectAllPlayerCards, selectPhase, selectTurn } from '../selectors';
import { ShipCard, TurnPhase } from '@app/models';

@Injectable()
export class GameEffects {
  private store = inject(Store);
  private actions$ = inject(Actions);

  nextPhase$ = createEffect(() =>
    this.actions$.pipe(
      ofType(nextPhase),
      withLatestFrom(this.store.select(selectPhase)),
      map(([action, phase]) => {
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
    )
  );

  setPhase$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setPhase),
        tap((action) => {
          switch (action.phase) {
            case TurnPhase.EnemyPlay:
              this.store.dispatch(spawnEnemies());
              break;
            case TurnPhase.BattleResolve:
              this.store.dispatch(startBattle());
              break;
            case TurnPhase.DrawPhase:
              // TODO: fix card amount based on rules
              this.store.dispatch(drawCards({ amount: 1 }));
              this.store.dispatch(nextPhase());
              break;
          }
        })
      ),
    { dispatch: false }
  );

  nextTurn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(nextTurn),
      withLatestFrom(this.store.select(selectTurn)),
      map(([action, turnNumber]) => ({
        type: GAME_SET_TURN,
        number: turnNumber + 1,
      }))
    )
  );

  drawCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(drawCards),
      withLatestFrom(this.store.select(selectAllPlayerCards)),
      map(([action, playerCards]) => {
        const toDraw = playerCards.slice(0, Math.min(action.amount, playerCards.length)).map(withRandomId);
        return { type: GAME_ADD_TO_HAND, cards: toDraw };
      })
    )
  );

  playCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(playCard),
      map((action) => {
        if (isShip(action.card)) {
          this.store.dispatch(addPlayerShip({ card: action.card as ShipCard }));
          return { type: GAME_USE_FUEL, amount: action.card.cost };
        } else {
          return { type: GAME_SPEND_CREDITS, amount: action.card.cost };
        }
      })
    )
  );
}
