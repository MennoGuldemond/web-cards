import { TurnPhase } from '@app/models';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface TurnState {
  phase: TurnPhase;
  turnNumber: number;
}

export const selectTurnState = createFeatureSelector<TurnState>('turn');
export const selectPhase = createSelector(selectTurnState, (state) => state.phase);
export const selectTurnNumber = createSelector(selectTurnState, (state) => state.turnNumber);
