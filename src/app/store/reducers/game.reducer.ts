import { createReducer, on } from '@ngrx/store';
import {
  addToHand,
  applyCard,
  cancelCard,
  clearDiscard,
  discard,
  playCard,
  refuel,
  removeCardFromGameDeck,
  removeFromGameDeck,
  setGameDeck,
  setPhase,
  setTurn,
  spendCredits,
  takeDamage,
  useFuel,
} from '../actions';
import { GameState } from '../selectors';
import { Effects, TurnPhase } from '@app/models';
import { hasEffect, isEconomic, isShip } from '@app/utils';

export const initialGameState: GameState = {
  turnPhase: TurnPhase.PlayerPlay,
  turnNumber: 1,
  arkHealth: 20,
  credits: 3,
  fuel: 3,
  deck: [],
  hand: [],
  discard: [],
  pendingCard: null,
};

const _gameReducer = createReducer(
  initialGameState,
  on(setPhase, (state, { phase }) => {
    return { ...state, turnPhase: phase };
  }),
  on(setTurn, (state, { number }) => {
    return { ...state, turnNumber: number, credits: initialGameState.credits, fuel: initialGameState.fuel };
  }),
  on(playCard, (state, { card }) => {
    let handCopy = [...state.hand];
    handCopy.splice(handCopy.indexOf(card), 1);
    if (isShip(card) || isEconomic(card)) {
      return { ...state, discard: [...state.discard, card], hand: handCopy };
    }
    return { ...state, hand: handCopy, pendingCard: card };
  }),
  on(applyCard, (state) => {
    return { ...state, discard: [...state.discard, state.pendingCard], pendingCard: null };
  }),
  on(cancelCard, (state) => {
    return { ...state, hand: [...state.hand, state.pendingCard], pendingCard: null };
  }),
  on(addToHand, (state, { cards }) => {
    return { ...state, hand: [...state.hand, ...cards] };
  }),
  on(discard, (state, { card }) => {
    let handCopy = [...state.hand];
    handCopy.splice(handCopy.indexOf(card), 1);
    return { ...state, hand: handCopy, discard: [...state.discard, card] };
  }),
  on(takeDamage, (state, { amount }) => {
    return { ...state, arkHealth: state.arkHealth - amount };
  }),
  on(spendCredits, (state, { amount }) => {
    return { ...state, credits: state.credits - amount };
  }),
  on(useFuel, (state, { amount }) => {
    return { ...state, fuel: state.fuel - amount };
  }),
  on(refuel, (state, { amount }) => {
    return { ...state, fuel: state.fuel + amount };
  }),
  on(setGameDeck, (state, { cards }) => {
    return { ...state, deck: cards };
  }),
  on(removeFromGameDeck, (state, { amount }) => ({
    ...state,
    deck: state.deck.slice(amount),
  })),
  on(removeCardFromGameDeck, (state, { card }) => {
    let deckCopy = [...state.deck];
    deckCopy.splice(deckCopy.indexOf(card), 1);
    return { ...state, deck: deckCopy };
  }),
  on(clearDiscard, (state) => ({
    ...state,
    discard: initialGameState.discard,
  }))
);

export function gameReducer(state: any, action: any): GameState {
  return _gameReducer(state, action);
}
