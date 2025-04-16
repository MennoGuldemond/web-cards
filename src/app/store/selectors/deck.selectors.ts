import { Card, Deck } from '@app/models';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface DeckState {
  deck: Deck;
  cards: Card[];
}

export const selectDeckState = createFeatureSelector<DeckState>('deck');
export const selectDeckData = createSelector(selectDeckState, (state) => state.deck);
export const selectDeckCards = createSelector(selectDeckState, (state) => state.cards);
