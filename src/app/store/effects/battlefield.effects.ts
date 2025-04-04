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
import { map, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAllEnemyShipCards, selectBattlefieldState, selectGameState } from '../selectors';
import { GameService } from '@app/services';

@Injectable()
export class BattlefieldEffects {
  private store = inject(Store);
  private actions$ = inject(Actions);
  private gameService = inject(GameService);

  spawnEnemies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(spawnEnemies),
      withLatestFrom(this.store.select(selectGameState), this.store.select(selectAllEnemyShipCards)),
      map(([action, gameState, enemyShips]) => {
        const shipsToAdd = this.gameService.generateEnemyWave(enemyShips, gameState.turnNumber);
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
        console.log('Battle has started');
        return attackStart();
      })
    )
  );

  endBattle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(endBattle),
      map((action) => {
        console.log('Battle has ended');
        return nextPhase();
      })
    )
  );

  attackStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(attackStart),
      withLatestFrom(this.store.select(selectBattlefieldState)),
      map(([action, battlefieldState]) => {
        if (battlefieldState.battleQue.length) {
          const attacker = battlefieldState.battleQue[0];
          const defender = attacker.ship.isEnemy ? battlefieldState.playerShips[0] : battlefieldState.enemyShips[0];
          // TODO: calculate if hit, apply possible moddifiers
          console.log(`${attacker.title} attacked ${defender.title} for ${attacker.ship.attack} damage`);
          this.store.dispatch(damageShip({ card: defender, amount: attacker.ship.attack }));
          return attackEnd();
        }
        return endBattle();
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
