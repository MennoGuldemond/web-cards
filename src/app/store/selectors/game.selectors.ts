import { Card, TurnPhase } from '@app/models';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface GameState {
  turnPhase: TurnPhase;
  turnNumber: number;
  arkHealth: number;
  credits: number;
  fuel: number;
  deck: Card[];
  hand: Card[];
  discard: Card[];
  pendingCard: Card;
}

export const selectGameState = createFeatureSelector<GameState>('game');
export const selectPhase = createSelector(selectGameState, (state) => state.turnPhase);
export const selectTurn = createSelector(selectGameState, (state) => state.turnNumber);
export const selectArkHealth = createSelector(selectGameState, (state) => state.arkHealth);
export const selectCredits = createSelector(selectGameState, (state) => state.credits);
export const selectFuel = createSelector(selectGameState, (state) => state.fuel);
export const selectHand = createSelector(selectGameState, (state) => state.hand);
export const selectPendingCard = createSelector(selectGameState, (state) => state.pendingCard);
export const selectGameDeck = createSelector(selectGameState, (state) => state.deck);
export const selectDiscard = createSelector(selectGameState, (state) => state.discard);
