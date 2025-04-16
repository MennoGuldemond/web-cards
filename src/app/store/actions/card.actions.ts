import { Card } from '@app/models';
import { createAction, props } from '@ngrx/store';

export const getCard = createAction('[Card] getCard', props<{ id: string }>());
export const getCards = createAction('[Card] getCards');

export const setCard = createAction('[Card] setCard', props<{ card: Card }>());
export const setCards = createAction('[Card] setCards', props<{ cards: Card[] }>());

export const saveCard = createAction('[Card] saveCard', props<{ card: Card }>());
