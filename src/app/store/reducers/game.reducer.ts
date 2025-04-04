import { createReducer, on } from '@ngrx/store';
import { addToHand, discard, playCard, refuel, setPhase, setTurn, spendCredits, takeDamage, useFuel } from '../actions';
import { GameState } from '../selectors';
import { TurnPhase } from '@app/models';

export const initialGameState: GameState = {
  turnPhase: TurnPhase.PlayerPlay,
  turnNumber: 1,
  arkHealth: 20,
  credits: 2,
  fuel: 5,
  hand: [],
  deck: [],
  discard: [],
};

const _gameReducer = createReducer(
  initialGameState,
  on(setPhase, (state, action) => {
    return { ...state, turnPhase: action.phase };
  }),
  on(setTurn, (state, action) => {
    return { ...state, turnNumber: action.number };
  }),
  on(playCard, (state, action) => {
    let handCopy = [...state.hand];
    handCopy.splice(handCopy.indexOf(action.card), 1);
    return { ...state, discard: [...state.discard, action.card], hand: handCopy };
  }),
  on(addToHand, (state, action) => {
    return { ...state, hand: [...state.hand, ...action.cards] };
  }),
  on(discard, (state, action) => {
    let handCopy = [...state.hand];
    handCopy.splice(handCopy.indexOf(action.card), 1);
    return { ...state, hand: handCopy, discard: [...state.discard, action.card] };
  }),
  on(takeDamage, (state, action) => {
    return { ...state, arkHealth: state.arkHealth - action.amount };
  }),
  on(spendCredits, (state, action) => {
    return { ...state, credits: state.credits - action.amount };
  }),
  on(useFuel, (state, action) => {
    return { ...state, fuel: state.fuel - action.amount };
  }),
  on(refuel, (state, action) => {
    return { ...state, fuel: state.fuel + action.amount };
  })
);

export function gameReducer(state: any, action: any): GameState {
  return _gameReducer(state, action);
}
