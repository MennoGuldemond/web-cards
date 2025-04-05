import { CardEffect, ShipCard } from '@app/models';
import { createAction, props } from '@ngrx/store';

export const BATTLEFIELD_ADD_PLAYER_SHIP = '[Battlefield] addPlayerShip';
export const BATTLEFIELD_SPAWN_ENEMIES = '[Battlefield] spawnEnemies';
export const BATTLEFIELD_ADD_ENEMIES = '[Battlefield] addEnemies';

export const BATTLEFIELD_DAMAGE_SHIP = '[Battlefield] damageShip';
export const BATTLEFIELD_DESTROY_SHIP = '[Battlefield] destroyShip';
export const BATTLEFIELD_ADD_EFFECTS_TO_SHIP = '[Battlefield] addEffectsToShip';

export const BATTLEFIELD_START_BATTLE = '[Battlefield] startBattle';
export const BATTLEFIELD_END_BATTLE = '[Battlefield] endBattle';
export const BATTLEFIELD_ATTACK_START = '[Battlefield] attackStart';
export const BATTLEFIELD_ATTACK_END = '[Battlefield] attackEnd';

export const addPlayerShip = createAction(BATTLEFIELD_ADD_PLAYER_SHIP, props<{ card: ShipCard }>());
export const spawnEnemies = createAction(BATTLEFIELD_SPAWN_ENEMIES);
export const addEnemies = createAction(BATTLEFIELD_ADD_ENEMIES, props<{ cards: ShipCard[] }>());

export const damageShip = createAction(BATTLEFIELD_DAMAGE_SHIP, props<{ card: ShipCard; amount: number }>());
export const destroyShip = createAction(BATTLEFIELD_DESTROY_SHIP, props<{ card: ShipCard }>());
export const addEffectsToShip = createAction(
  BATTLEFIELD_ADD_EFFECTS_TO_SHIP,
  props<{ card: ShipCard; effects: CardEffect[] }>()
);

export const startBattle = createAction(BATTLEFIELD_START_BATTLE);
export const endBattle = createAction(BATTLEFIELD_END_BATTLE);
export const attackStart = createAction(BATTLEFIELD_ATTACK_START);
export const attackEnd = createAction(BATTLEFIELD_ATTACK_END);
