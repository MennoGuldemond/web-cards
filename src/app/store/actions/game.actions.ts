import { Card } from '@app/models';
import { createAction, props } from '@ngrx/store';

export const GAME_PLAY_CARD = '[Game] playCard';
export const GAME_TAKE_DAMAGE = '[Game] takeDamage';
export const GAME_SPEND_CREDITS = '[Game] spendCredits';
export const GAME_USE_FUEL = '[Game] useFuel';
export const GAME_REFUEL = '[Game] refuel';
export const GAME_RESOLVE_BATTLE = '[Game] resolveBattle';

export const playCard = createAction(GAME_PLAY_CARD, props<{ card: Card }>());
export const takeDamage = createAction(GAME_TAKE_DAMAGE, props<{ amount: number }>());
export const spendCredits = createAction(GAME_SPEND_CREDITS, props<{ amount: number }>());
export const useFuel = createAction(GAME_USE_FUEL, props<{ amount: number }>());
export const refuel = createAction(GAME_REFUEL, props<{ amount: number }>());
export const resolveBattle = createAction(GAME_RESOLVE_BATTLE);
