import { ShipCard } from '@app/models';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface GameState {
  arkHealth: number;
  credits: number;
  fuel: number;
  turn: number;
  playerShips: ShipCard[];
  enemyShips: ShipCard[];
}

export const selectGameState = createFeatureSelector<GameState>('game');
export const selectArkHealth = createSelector(selectGameState, (state) => state.arkHealth);
export const selectCredits = createSelector(selectGameState, (state) => state.credits);
export const selectFuel = createSelector(selectGameState, (state) => state.fuel);
export const selectTurn = createSelector(selectGameState, (state) => state.turn);
export const selectPlayerShips = createSelector(selectGameState, (state) => state.playerShips);
export const selectEnemyShips = createSelector(selectGameState, (state) => state.enemyShips);
