import { Card } from '@app/models';
import { createAction, props } from '@ngrx/store';

export const CARD_GET_CARD = '[Card] getCard';
export const CARD_GET_CARDS = '[Card] getCards';
export const CARD_SET_CARD = '[Card] setCard';
export const CARD_SET_CARDS = '[Card] setCards';
export const CARD_SAVE_CARD = '[Card] saveCard';

export const getCard = createAction(CARD_GET_CARD, props<{ id: string }>());
export const getCards = createAction(CARD_GET_CARDS);

export const setCard = createAction(CARD_SET_CARD, props<{ card: Card }>());
export const setCards = createAction(CARD_SET_CARDS, props<{ cards: Card[] }>());

export const saveCard = createAction(CARD_SAVE_CARD, props<{ card: Card }>());
