import { ShipCard } from '@app/models';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface BattlefieldState {
  playerShips: ShipCard[];
  enemyShips: ShipCard[];
  battleQue: ShipCard[];
}

export const selectBattlefieldState = createFeatureSelector<BattlefieldState>('battlefield');
export const selectPlayerShips = createSelector(selectBattlefieldState, (state) => state.playerShips);
export const selectEnemyShips = createSelector(selectBattlefieldState, (state) => state.enemyShips);
export const selectAllShips = createSelector(selectBattlefieldState, (state) => [
  ...state.enemyShips,
  ...state.playerShips,
]);
