import { createReducer, on } from '@ngrx/store';
import { playCard, refuel, spendCredits, takeDamage, useFuel } from '../actions';
import { GameState } from '../selectors';

export const initialGameState: GameState = {
  arkHealth: 20,
  credits: 2,
  fuel: 5,
  turn: 1,
  playerShips: [],
  enemyShips: [],
};

const _gameReducer = createReducer(
  initialGameState,
  on(playCard, (state, action) => {
    return { ...state, cards: [...state.playerShips, action.card] };
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
