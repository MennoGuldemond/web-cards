import { createReducer, on } from '@ngrx/store';
import { addToHand, playCard, refuel, spendCredits, takeDamage, useFuel } from '../actions';
import { GameState } from '../selectors';
import { asShip, isShip } from '@app/utils';

export const initialGameState: GameState = {
  arkHealth: 20,
  credits: 2,
  fuel: 5,
  turn: 1,
  playerShips: [],
  enemyShips: [],
  hand: [],
};

const _gameReducer = createReducer(
  initialGameState,
  on(playCard, (state, action) => {
    if (isShip(action.card)) {
      const playedCard = asShip(action.card);
      let handCopy = [...state.hand];
      handCopy.splice(handCopy.indexOf(playedCard), 1);
      return { ...state, playerShips: [...state.playerShips, playedCard], hand: handCopy };
    }
    return { ...state };
  }),
  on(addToHand, (state, action) => {
    return { ...state, hand: [...state.hand, ...action.cards] };
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
