import { createReducer, on } from '@ngrx/store';
import { setPhase, setTurn } from '../actions';
import { TurnState } from '../selectors';
import { TurnPhase } from '@app/models';

export const initialTurnState: TurnState = {
  phase: TurnPhase.EnemyPlay,
  turnNumber: 0,
};

const _turnReducer = createReducer(
  initialTurnState,
  on(setPhase, (state, action) => {
    return { ...state, phase: action.phase };
  }),
  on(setTurn, (state, action) => {
    return { ...state, turnNumber: action.number };
  })
);

export function turnReducer(state: any, action: any): TurnState {
  return _turnReducer(state, action);
}
