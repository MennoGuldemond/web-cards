import { Action, createReducer, on } from '@ngrx/store';
import { setDeck, setDeckCards } from '../actions';
import { DeckState } from '../selectors';

export const initialDeckState: DeckState = {
  deck: null,
  cards: [],
};

const _deckReducer = createReducer(
  initialDeckState,
  on(setDeck, (state, { deck }) => ({ ...state, deck: deck })),
  on(setDeckCards, (state, { cards }) => ({ ...state, cards: cards }))
);

export function deckReducer(state: DeckState, action: Action): DeckState {
  return _deckReducer(state, action);
}
