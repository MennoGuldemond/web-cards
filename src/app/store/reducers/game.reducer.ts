import { createReducer, on } from '@ngrx/store';
import {
  addToHand,
  applyCard,
  cancelCard,
  clearDiscard,
  discardCard,
  discardHand,
  playCard,
  refuel,
  removeCardFromDrawPile,
  removeFromDrawPile,
  setDrawPile,
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
  drawPile: [],
  hand: [],
  discardPile: [],
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
      if (hasEffect(card, Effects.consume)) {
        return { ...state, hand: handCopy };
      }
      return { ...state, discardPile: [...state.discardPile, card], hand: handCopy };
    }
    return { ...state, hand: handCopy, pendingCard: card };
  }),
  on(applyCard, (state) => {
    if (hasEffect(state.pendingCard, Effects.consume)) {
      return { ...state, pendingCard: null };
    }
    return { ...state, discardPile: [...state.discardPile, state.pendingCard], pendingCard: null };
  }),
  on(cancelCard, (state) => {
    return { ...state, hand: [...state.hand, state.pendingCard], pendingCard: null };
  }),
  on(addToHand, (state, { cards }) => {
    return { ...state, hand: [...state.hand, ...cards] };
  }),
  on(discardCard, (state, { card }) => {
    let handCopy = [...state.hand];
    handCopy.splice(handCopy.indexOf(card), 1);
    return { ...state, hand: handCopy, discardPile: [...state.discardPile, card] };
  }),
  on(discardHand, (state) => {
    const toKeep = state.hand.filter((card) => hasEffect(card, Effects.retain));
    const toDiscard = state.hand.filter((card) => !hasEffect(card, Effects.retain));
    return { ...state, hand: toKeep, discardPile: [...state.discardPile, ...toDiscard] };
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
  on(setDrawPile, (state, { cards }) => {
    return { ...state, drawPile: cards };
  }),
  on(removeFromDrawPile, (state, { amount }) => ({
    ...state,
    drawPile: state.drawPile.slice(amount),
  })),
  on(removeCardFromDrawPile, (state, { card }) => {
    let deckCopy = [...state.drawPile];
    deckCopy.splice(deckCopy.indexOf(card), 1);
    return { ...state, drawPile: deckCopy };
  }),
  on(clearDiscard, (state) => ({
    ...state,
    discardPile: [],
  }))
);

export function gameReducer(state: any, action: any): GameState {
  return _gameReducer(state, action);
}
