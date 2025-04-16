import { Card, CardEffect, ShipCard, TurnPhase } from '@app/models';
import { createAction, props } from '@ngrx/store';

export const startGame = createAction('[Game] startGame');
export const endGame = createAction('[Game] endGame');

export const nextPhase = createAction('[Game] nextPhase');
export const setPhase = createAction('[Game] setPhase', props<{ phase: TurnPhase }>());
export const nextTurn = createAction('[Game] nextTurn');
export const setTurn = createAction('[Game] setTurn', props<{ number: number }>());
export const processEndOfTurnEffects = createAction('[Game] processEndOfTurnEffects');

export const setDrawPile = createAction('[Game] setDrawPile', props<{ cards: Card[] }>());
export const removeFromDrawPile = createAction('[Game] removeFromDrawPile', props<{ amount: number }>());
export const removeCardFromDrawPile = createAction('[Game] removeCardFromDrawPile', props<{ card: Card }>());
export const drawCards = createAction('[Game] drawCards', props<{ amount: number }>());
export const playCard = createAction('[Game] playCard', props<{ card: Card }>());
export const applyCard = createAction('[Game] applyCard', props<{ targetShip: ShipCard; effects: CardEffect[] }>());
export const cancelCard = createAction('[Game] cancelCard');
export const addToHand = createAction('[Game] addToHand', props<{ cards: Card[] }>());
export const discardCard = createAction('[Game] discardCard', props<{ card: Card }>());
export const discardHand = createAction('[Game] discardHand');
export const clearDiscard = createAction('[Game] clearDiscard');

export const takeDamage = createAction('[Game] takeDamage', props<{ amount: number }>());
export const spendCredits = createAction('[Game] spendCredits', props<{ amount: number }>());
export const useFuel = createAction('[Game] useFuel', props<{ amount: number }>());
export const refuel = createAction('[Game] refuel', props<{ amount: number }>());
