import { Card, CardEffect, ShipCard, TurnPhase } from '@app/models';
import { createAction, props } from '@ngrx/store';

export const GAME_NEXT_PHASE = '[Game] nextPhase';
export const GAME_SET_PHASE = '[Game] setPhase';
export const GAME_NEXT_TURN = '[Game] nextTurn';
export const GAME_SET_TURN = '[Game] setTurn';

export const GAME_DRAW_CARDS = '[Game] drawCards';
export const GAME_PLAY_CARD = '[Game] playCard';
export const GAME_APPLY_CARD = '[Game] applyCard';
export const GAME_CANCEL_CARD = '[Game] cancelCard';
export const GAME_ADD_TO_HAND = '[Game] addToHand';
export const GAME_DISCARD = '[Game] discard';

export const GAME_TAKE_DAMAGE = '[Game] takeDamage';
export const GAME_SPEND_CREDITS = '[Game] spendCredits';
export const GAME_USE_FUEL = '[Game] useFuel';
export const GAME_REFUEL = '[Game] refuel';

export const nextPhase = createAction(GAME_NEXT_PHASE);
export const setPhase = createAction(GAME_SET_PHASE, props<{ phase: TurnPhase }>());
export const nextTurn = createAction(GAME_NEXT_TURN);
export const setTurn = createAction(GAME_SET_TURN, props<{ number: number }>());

export const drawCards = createAction(GAME_DRAW_CARDS, props<{ amount: number }>());
export const playCard = createAction(GAME_PLAY_CARD, props<{ card: Card }>());
export const applyCard = createAction(GAME_APPLY_CARD, props<{ targetShip: ShipCard; effects: CardEffect[] }>());
export const cancelCard = createAction(GAME_CANCEL_CARD);
export const addToHand = createAction(GAME_ADD_TO_HAND, props<{ cards: Card[] }>());
export const discard = createAction(GAME_DISCARD, props<{ card: Card }>());

export const takeDamage = createAction(GAME_TAKE_DAMAGE, props<{ amount: number }>());
export const spendCredits = createAction(GAME_SPEND_CREDITS, props<{ amount: number }>());
export const useFuel = createAction(GAME_USE_FUEL, props<{ amount: number }>());
export const refuel = createAction(GAME_REFUEL, props<{ amount: number }>());
