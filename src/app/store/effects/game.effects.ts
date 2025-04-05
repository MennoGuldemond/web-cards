import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addPlayerShip,
  drawCards,
  nextPhase,
  nextTurn,
  playCard,
  startBattle,
  setPhase,
  spawnEnemies,
  applyCard,
  useFuel,
  spendCredits,
  addToHand,
  setTurn,
  addEffectsToShip,
  processEndOfTurnEffects,
  damageShip,
} from '../actions';
import { map, tap, withLatestFrom } from 'rxjs';
import { getShipElement, getShortDescription, isShip, withRandomId } from '@app/utils';
import { Store } from '@ngrx/store';
import { selectAllPlayerCards, selectAllShips, selectPhase, selectTurn } from '../selectors';
import { Effects, ShipCard, TurnPhase } from '@app/models';
import { FloatEffectService } from '@app/services';

@Injectable()
export class GameEffects {
  private store = inject(Store);
  private actions$ = inject(Actions);
  private floatEffectService = inject(FloatEffectService);

  nextPhase$ = createEffect(() =>
    this.actions$.pipe(
      ofType(nextPhase),
      withLatestFrom(this.store.select(selectPhase)),
      map(([action, phase]) => {
        switch (phase) {
          case TurnPhase.EnemyPlay:
            return setPhase({ phase: TurnPhase.PlayerPlay });
          case TurnPhase.PlayerPlay:
            return setPhase({ phase: TurnPhase.BattleResolve });
          case TurnPhase.BattleResolve:
            return setPhase({ phase: TurnPhase.DrawPhase });
          case TurnPhase.DrawPhase:
            this.store.dispatch(nextTurn());
            return setPhase({ phase: TurnPhase.EnemyPlay });
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
      map(([action, turnNumber]) => {
        this.store.dispatch(processEndOfTurnEffects());
        return setTurn({ number: turnNumber + 1 });
      })
    )
  );

  drawCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(drawCards),
      withLatestFrom(this.store.select(selectAllPlayerCards)),
      map(([action, playerCards]) => {
        const toDraw = playerCards.slice(0, Math.min(action.amount, playerCards.length)).map(withRandomId);
        return addToHand({ cards: toDraw });
      })
    )
  );

  playCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(playCard),
      map((action) => {
        if (isShip(action.card)) {
          this.store.dispatch(addPlayerShip({ card: action.card as ShipCard }));
          return useFuel({ amount: action.card.cost });
        } else {
          return spendCredits({ amount: action.card.cost });
        }
      })
    )
  );

  applyCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(applyCard),
      map((action) => {
        action.effects.forEach((e) => {
          this.floatEffectService.show(getShortDescription(e), getShipElement(action.targetShip.id), true);
        });
        return addEffectsToShip({ card: action.targetShip, effects: action.effects });
      })
    )
  );

  processEndOfTurnEffects$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(processEndOfTurnEffects),
        withLatestFrom(this.store.select(selectAllShips)),
        map(([action, allShips]) => {
          // TODO: refactor to function
          allShips.forEach((ship) => {
            ship.effects.forEach((e) => {
              if (e.name === Effects.regeneration) {
                this.store.dispatch(damageShip({ card: ship, amount: -e.value }));
              }
            });
          });
        })
      ),
    { dispatch: false }
  );
}
