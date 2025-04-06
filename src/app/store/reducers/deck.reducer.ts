import { createReducer, on } from '@ngrx/store';
import { setDeck, setDeckCards } from '../actions';
import { DeckState } from '../selectors';

export const initialDeckState: DeckState = {
  deck: null,
  cards: [],
};

const _deckReducer = createReducer(
  initialDeckState,
  on(setDeck, (state, action) => ({ ...state, deck: action.deck })),
  on(setDeckCards, (state, action) => ({ ...state, cards: action.cards }))
);

export function deckReducer(state: any, action: any): DeckState {
  return _deckReducer(state, action);
}
