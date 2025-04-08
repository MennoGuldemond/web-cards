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
  startGame,
  setGameDeck,
  removeFromGameDeck,
} from '../actions';
import { from, map, switchMap, tap, withLatestFrom } from 'rxjs';
import {
  getEffect,
  getShipElement,
  getShortDescription,
  hasEffect,
  isEconomic,
  isShip,
  shuffleArray,
  withRandomId,
} from '@app/utils';
import { Action, Store } from '@ngrx/store';
import { selectAllShips, selectDeckCards, selectGameDeck, selectPhase, selectTurn } from '../selectors';
import { Effects, ShipCard, TurnPhase } from '@app/models';
import { FloatEffectService } from '@app/services';

@Injectable()
export class GameEffects {
  private store = inject(Store);
  private actions$ = inject(Actions);
  private floatEffectService = inject(FloatEffectService);

  startGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startGame),
      withLatestFrom(this.store.select(selectDeckCards)),
      map(([action, deckCards]) => {
        const shuffled = shuffleArray([...deckCards]); // clone + shuffle
        this.store.dispatch(setGameDeck({ cards: shuffled }));
        this.store.dispatch(setPhase({ phase: TurnPhase.EnemyPlay }));
        return drawCards({ amount: 3 });
      })
    )
  );

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
      withLatestFrom(this.store.select(selectGameDeck)),
      map(([action, deck]) => {
        const toDraw = deck.slice(0, Math.min(action.amount, deck.length)).map(withRandomId);
        this.store.dispatch(removeFromGameDeck({ amount: toDraw.length }));
        return addToHand({ cards: toDraw });
      })
    )
  );

  playCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(playCard),
      switchMap((action) => {
        const actions: Action[] = [];

        if (isShip(action.card)) {
          actions.push(addPlayerShip({ card: action.card as ShipCard }));
          actions.push(useFuel({ amount: action.card.cost }));
        } else {
          if (isEconomic(action.card)) {
            if (hasEffect(action.card, Effects.logistics)) {
              const drawAmount = getEffect(action.card, Effects.logistics).value;
              actions.push(drawCards({ amount: drawAmount }));
            }
          }
          actions.push(spendCredits({ amount: action.card.cost }));
        }

        return from(actions); // emit actions one-by-one
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
