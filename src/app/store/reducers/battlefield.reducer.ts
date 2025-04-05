import { createReducer, on } from '@ngrx/store';
import {
  addEnemies,
  addPlayerShip,
  attackEnd,
  damageShip,
  destroyShip,
  endBattle,
  startBattle,
  addEffectsToShip,
} from '../actions';
import { BattlefieldState } from '../selectors';
import { asShip, mergeEffects } from '@app/utils';

export const initialBattlefieldState: BattlefieldState = {
  playerShips: [],
  enemyShips: [],
  battleQue: [],
};

const _battlefieldReducer = createReducer(
  initialBattlefieldState,
  on(addPlayerShip, (state, action) => {
    return { ...state, playerShips: [...state.playerShips, asShip(action.card)] };
  }),
  on(addEnemies, (state, action) => {
    return { ...state, enemyShips: [...state.enemyShips, ...action.cards.map(asShip)] };
  }),
  on(addEffectsToShip, (state, action) => ({
    ...state,
    playerShips: state.playerShips.map((s) =>
      s.id === action.card.id
        ? {
            ...s,
            effects: mergeEffects(s.effects, action.effects),
          }
        : s
    ),
  })),
  on(damageShip, (state, { card, amount }) => {
    return {
      ...state,
      playerShips: state.playerShips.map((ship) =>
        ship.id === card.id ? { ...ship, ship: { ...ship.ship, health: Math.max(0, ship.ship.health - amount) } } : ship
      ),
      enemyShips: state.enemyShips.map((ship) =>
        ship.id === card.id ? { ...ship, ship: { ...ship.ship, health: Math.max(0, ship.ship.health - amount) } } : ship
      ),
    };
  }),
  on(destroyShip, (state, { card }) => ({
    ...state,
    playerShips: state.playerShips.filter((ship) => ship.id !== card.id),
    enemyShips: state.enemyShips.filter((ship) => ship.id !== card.id),
    battleQue: state.battleQue.filter((ship) => ship.id !== card.id), // Also remove from battle queue
  })),
  on(startBattle, (state) => ({
    ...state,
    battleQue: [...state.playerShips, ...state.enemyShips].sort((a, b) => a.ship.initiative - b.ship.initiative),
  })),
  on(endBattle, (state) => ({
    ...state,
    battleQue: [],
  })),
  on(attackEnd, (state) => ({
    ...state,
    battleQue: state.battleQue.slice(1),
  }))
);

export function battlefieldReducer(state: any, action: any): BattlefieldState {
  return _battlefieldReducer(state, action);
}
