import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addEnemies,
  drawCards,
  GAME_ADD_TO_HAND,
  GAME_SET_PHASE,
  GAME_SET_TURN,
  GAME_SPEND_CREDITS,
  GAME_USE_FUEL,
  nextPhase,
  nextTurn,
  playCard,
  resolveBattle,
  setPhase,
  spawnEnemies,
} from '../actions';
import { map, tap, withLatestFrom } from 'rxjs';
import { isShip } from '@app/utils';
import { Store } from '@ngrx/store';
import { selectAllEnemyShips, selectAllPlayerCards, selectGameState, selectPhase, selectTurn } from '../selectors';
import { TurnPhase } from '@app/models';
import { GameService } from '@app/services';

@Injectable()
export class GameEffects {
  private store = inject(Store);
  private actions$ = inject(Actions);
  private gameService = inject(GameService);

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
              this.store.dispatch(resolveBattle());
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
        const toDraw = playerCards.slice(0, Math.min(action.amount, playerCards.length));
        return { type: GAME_ADD_TO_HAND, cards: toDraw };
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

  spawnEnemies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(spawnEnemies),
      withLatestFrom(this.store.select(selectGameState), this.store.select(selectAllEnemyShips)),
      map(([action, gameState, enemyShips]) => {
        const shipsToAdd = this.gameService.generateEnemyWave(enemyShips, gameState.turnNumber);
        this.store.dispatch(addEnemies({ enemies: shipsToAdd }));
        return nextPhase();
      })
    )
  );

  resolveBattle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(resolveBattle),
      withLatestFrom(this.store.select(selectGameState)),
      map(([action, gameState]) => {
        this.gameService.resolveBattle(gameState);
        return nextPhase();
      })
    )
  );
}
