import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addEnemies,
  damageShip,
  destroyShip,
  nextPhase,
  startBattle,
  spawnEnemies,
  endBattle,
  attackStart,
  attackEnd,
} from '../actions';
import { delay, map, of, switchMap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAllEnemyShipCards, selectBattlefieldState, selectGameState } from '../selectors';
import { calculateHit, generateEnemyWave, getShipElement } from '@app/utils';
import { FloatEffectService } from '@app/services';

@Injectable()
export class BattlefieldEffects {
  private readonly BATTLE_DELAY = 500;
  private store = inject(Store);
  private actions$ = inject(Actions);
  private floatEffectService = inject(FloatEffectService);

  spawnEnemies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(spawnEnemies),
      withLatestFrom(this.store.select(selectGameState), this.store.select(selectAllEnemyShipCards)),
      map(([action, gameState, enemyShips]) => {
        const shipsToAdd = generateEnemyWave(enemyShips, gameState.turnNumber);
        this.store.dispatch(addEnemies({ cards: shipsToAdd }));
        return nextPhase();
      })
    )
  );

  damageShip$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(damageShip),
        map((action) => {
          if (action.card.ship.health <= action.amount) {
            this.store.dispatch(destroyShip({ card: action.card }));
          }
        })
      ),
    { dispatch: false }
  );

  startBattle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startBattle),
      map((action) => {
        return attackStart();
      })
    )
  );

  endBattle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(endBattle),
      map((action) => {
        return nextPhase();
      })
    )
  );

  attackStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(attackStart),
      withLatestFrom(this.store.select(selectBattlefieldState)),
      switchMap(([action, battlefieldState]) => {
        if (battlefieldState.battleQue.length) {
          const attacker = battlefieldState.battleQue[0];
          const defender = attacker.ship.isEnemy ? battlefieldState.playerShips[0] : battlefieldState.enemyShips[0];

          if (calculateHit(attacker, defender)) {
            this.floatEffectService.show(`-${attacker.ship.attack}`, getShipElement(defender.id));
            this.store.dispatch(damageShip({ card: defender, amount: attacker.ship.attack }));
          } else {
            this.floatEffectService.show('miss', getShipElement(defender.id));
          }

          return of(attackEnd()).pipe(delay(this.BATTLE_DELAY));
        }
        return of(endBattle()).pipe(delay(this.BATTLE_DELAY));
      })
    )
  );

  attackEnd$ = createEffect(() =>
    this.actions$.pipe(
      ofType(attackEnd),
      map((action) => {
        return attackStart();
      })
    )
  );
}
