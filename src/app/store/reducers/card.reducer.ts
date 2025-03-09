import { createReducer, on } from '@ngrx/store';
import { setCard, setCards } from '../actions';
import { CardState } from '../selectors';

export const initialCardState: CardState = {
  cards: [],
};

const _cardReducer = createReducer(
  initialCardState,
  on(setCard, (state, action) => {
    let cards = state.cards.filter((r) => r.id !== action.card.id);
    return { ...state, cards: [...cards, action.card] };
  }),
  on(setCards, (state, action) => {
    // Remove outdated cards in state
    let cards = state.cards.filter((r) => {
      return action.cards.find((r2) => r2.id === r.id) ? null : r;
    });
    return { ...state, cards: [...cards, ...action.cards] };
  })
);

export function cardReducer(state: any, action: any): CardState {
  return _cardReducer(state, action);
}
