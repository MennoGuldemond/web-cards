import { AppUser, Card, Deck } from '@app/models';
import { createAction, props } from '@ngrx/store';

export const DECK_GET_DECK = '[Deck] getDeck';
export const DECK_SET_DECK = '[Deck] setDeck';
export const DECK_SAVE_DECK = '[Deck] saveDeck';
export const DECK_GET_DECK_CARDS = '[Deck] getDeckCards';
export const DECK_SET_DECK_CARDS = '[Deck] setDeckCards';
export const DECK_CREATE_BASE_DECK = '[Deck] createBaseDeck';

export const getDeck = createAction(DECK_GET_DECK);
export const setDeck = createAction(DECK_SET_DECK, props<{ deck: Deck }>());
export const saveDeck = createAction(DECK_SAVE_DECK, props<{ deck: Deck }>());
export const getDeckCards = createAction(DECK_GET_DECK_CARDS);
export const setDeckCards = createAction(DECK_SET_DECK_CARDS, props<{ cards: Card[] }>());
export const createBaseDeck = createAction(DECK_CREATE_BASE_DECK, props<{ user: AppUser }>());
