import { TurnPhase } from '@app/models';
import { createAction, props } from '@ngrx/store';

export const TURN_NEXT_PHASE = '[Turn] nextPhase';
export const TURN_SET_PHASE = '[Turn] setPhase';
export const TURN_NEXT_TURN = '[Turn] nextTurn';
export const TURN_SET_TURN = '[Turn] setTurn';

export const nextPhase = createAction(TURN_NEXT_PHASE);
export const setPhase = createAction(TURN_SET_PHASE, props<{ phase: TurnPhase }>());
export const nextTurn = createAction(TURN_NEXT_TURN);
export const setTurn = createAction(TURN_SET_TURN, props<{ number: number }>());
