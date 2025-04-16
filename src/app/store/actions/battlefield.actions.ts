import { CardEffect, ShipCard } from '@app/models';
import { createAction, props } from '@ngrx/store';

export const addPlayerShip = createAction('[Battlefield] addPlayerShip', props<{ card: ShipCard }>());
export const spawnEnemies = createAction('[Battlefield] spawnEnemies');
export const addEnemies = createAction('[Battlefield] addEnemies', props<{ cards: ShipCard[] }>());

export const reorderPlayerShips = createAction('[Battlefield] reorderPlayerShips', props<{ newOrder: ShipCard[] }>());
export const reorderEnemyShips = createAction('[Battlefield] reorderEnemyShips', props<{ newOrder: ShipCard[] }>());

export const damageShip = createAction('[Battlefield] damageShip', props<{ card: ShipCard; amount: number }>());
export const destroyShip = createAction('[Battlefield] destroyShip', props<{ card: ShipCard }>());
export const addEffectsToShip = createAction(
  '[Battlefield] addEffectsToShip',
  props<{ card: ShipCard; effects: CardEffect[] }>()
);

export const startBattle = createAction('[Battlefield] startBattle');
export const endBattle = createAction('[Battlefield] endBattle');
export const attackStart = createAction('[Battlefield] attackStart');
export const attackEnd = createAction('[Battlefield] attackEnd');
