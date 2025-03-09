import { Card } from '@app/models';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface CardState {
  cards: Card[];
}

export const selectCardState = createFeatureSelector<CardState>('card');
export const selectCards = createSelector(selectCardState, (state) => [...state.cards]);
export const selectCardById = (id: string) =>
  createSelector(selectCardState, (state) => state.cards.find((r) => r.id === id));
