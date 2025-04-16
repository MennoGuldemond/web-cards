import { AppUser, Card, Deck } from '@app/models';
import { createAction, props } from '@ngrx/store';

export const getDeck = createAction('[Deck] getDeck');
export const setDeck = createAction('[Deck] setDeck', props<{ deck: Deck }>());
export const saveDeck = createAction('[Deck] saveDeck', props<{ deck: Deck }>());
export const getDeckCards = createAction('[Deck] getDeckCards');
export const setDeckCards = createAction('[Deck] setDeckCards', props<{ cards: Card[] }>());
export const createBaseDeck = createAction('[Deck] createBaseDeck', props<{ user: AppUser }>());
